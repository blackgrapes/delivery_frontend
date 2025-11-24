import { useState, useEffect } from "react";
import { X, Shield, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Role, Permission } from "./types";
import { permissions } from "./mockData";

interface RoleFormProps {
  role: Role | null;
  onSave: (
    data: Omit<Role, "id" | "createdAt" | "userCount" | "isSystem">
  ) => void;
  onCancel: () => void;
}

const RoleForm = ({ role, onSave, onCancel }: RoleFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    }
  }, [role]);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleSelectAllCategory = (category: string) => {
    const categoryPermissions = permissions
      .filter((p) => p.category === category)
      .map((p) => p.id);

    const allSelected = categoryPermissions.every((p) =>
      formData.permissions.includes(p)
    );

    if (allSelected) {
      // Deselect all
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter(
          (p) => !categoryPermissions.includes(p)
        ),
      }));
    } else {
      // Select all
      setFormData((prev) => ({
        ...prev,
        permissions: [
          ...new Set([...prev.permissions, ...categoryPermissions]),
        ],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [...new Set(permissions.map((p) => p.category))];

  const filteredPermissions =
    selectedCategory === "all"
      ? permissions
      : permissions.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-border/70 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/70">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {role ? "Edit Role" : "Add New Role"}
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

              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="rounded-lg"
                  placeholder="e.g., Operations Manager"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                  className="rounded-lg min-h-[80px]"
                  placeholder="Describe the role and its responsibilities..."
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Permissions ({formData.permissions.length} selected)
                </h3>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-lg border border-border/70 bg-background px-3 py-1 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryPermissions = permissions.filter(
                    (p) => p.category === category
                  );
                  const selectedCount = categoryPermissions.filter((p) =>
                    formData.permissions.includes(p.id)
                  ).length;

                  if (
                    selectedCategory !== "all" &&
                    selectedCategory !== category
                  ) {
                    return null;
                  }

                  return (
                    <Card
                      key={category}
                      className="rounded-xl border-border/60"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">
                              {category}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {selectedCount}/{categoryPermissions.length}{" "}
                                selected
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-lg text-xs"
                                onClick={() =>
                                  handleSelectAllCategory(category)
                                }
                              >
                                {selectedCount === categoryPermissions.length
                                  ? "Deselect All"
                                  : "Select All"}
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {categoryPermissions.map((permission) => (
                              <div
                                key={permission.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                  formData.permissions.includes(permission.id)
                                    ? "border-primary bg-primary/5"
                                    : "border-border/60 hover:border-primary/50"
                                }`}
                                onClick={() =>
                                  handlePermissionToggle(permission.id)
                                }
                              >
                                <div
                                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                                    formData.permissions.includes(permission.id)
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border"
                                  }`}
                                >
                                  {formData.permissions.includes(
                                    permission.id
                                  ) && <CheckCircle2 className="h-3 w-3" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">
                                    {permission.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {permission.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Role Summary
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This role will have {formData.permissions.length}{" "}
                    permissions across {categories.length} categories. Users
                    assigned to this role will be able to perform the selected
                    actions.
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
                disabled={formData.permissions.length === 0}
              >
                <CheckCircle2 className="h-4 w-4" />
                {role ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleForm;
