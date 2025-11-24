import { useState, useEffect } from "react";
import {
  X,
  User,
  Building,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User as UserType, CreateUserData, UserRole } from "./types";
import { branches } from "./mockData";

interface UserFormProps {
  user: UserType | null;
  onSave: (data: CreateUserData) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSave, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUserData>({
    email: "",
    name: "",
    role: "customer",
    branchId: "",
    password: "",
    phone: "",
  });

  const [showBranchSelect, setShowBranchSelect] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        role: user.role,
        branchId: user.branchId || "",
        password: "", // Don't fill password for existing users
        phone: user.phone || "",
      });
      setShowBranchSelect(requiresBranch(user.role));
    }
  }, [user]);

  const requiresBranch = (role: UserRole) => {
    return ["branch", "dispatcher", "rider"].includes(role);
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role, branchId: "" }));
    setShowBranchSelect(requiresBranch(role));
  };

  const handleInputChange = (field: keyof CreateUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (requiresBranch(formData.role) && !formData.branchId) {
      alert("Please select a branch for this role");
      return;
    }

    onSave(formData);
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-border/70 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/70">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {user ? "Edit User" : "Add New User"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Role Assignment
              </h3>

              <div className="space-y-2">
                <Label htmlFor="role">User Role *</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="branch">Branch Manager</SelectItem>
                    <SelectItem value="dispatcher">Dispatcher</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showBranchSelect && (
                <div className="space-y-2">
                  <Label htmlFor="branchId">Assign to Branch *</Label>
                  <Select
                    value={formData.branchId}
                    onValueChange={(value) =>
                      handleInputChange("branchId", value)
                    }
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name} ({branch.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Security
              </h3>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type="text"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className="rounded-lg flex-1"
                    placeholder="Generate or enter password"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 rounded-lg"
                    onClick={generatePassword}
                  >
                    <Lock className="h-4 w-4" />
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.password ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Password generated successfully
                    </span>
                  ) : (
                    "Click generate to create a secure password"
                  )}
                </p>
              </div>
            </div>

            {/* Role Description */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Role Information
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.role === "branch" &&
                      "Branch managers can manage their assigned branch operations and staff"}
                    {formData.role === "dispatcher" &&
                      "Dispatchers manage delivery assignments and rider coordination"}
                    {formData.role === "rider" &&
                      "Riders handle package delivery and customer interactions"}
                    {formData.role === "partner" &&
                      "Partners have access to partner-specific features and analytics"}
                    {formData.role === "superadmin" &&
                      "Super admins have full system access and administrative privileges"}
                    {formData.role === "customer" &&
                      "Customers can track shipments and manage their deliveries"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border/70">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                {user ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
