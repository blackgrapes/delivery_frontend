import {
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "./types";

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const UserList = ({ users, onEditUser, onDeleteUser }: UserListProps) => {
  const getRoleColor = (role: string) => {
    const colors = {
      superadmin: "bg-purple-100 text-purple-800 border-purple-200",
      partner: "bg-orange-100 text-orange-800 border-orange-200",
      branch: "bg-blue-100 text-blue-800 border-blue-200",
      dispatcher: "bg-green-100 text-green-800 border-green-200",
      rider: "bg-yellow-100 text-yellow-800 border-yellow-200",
      customer: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[role as keyof typeof colors] || colors.customer;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          User List
          <Badge variant="secondary" className="rounded-full">
            {users.length} users
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id} className="rounded-xl border-border/70">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Building className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {user.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                              {user.id}
                            </code>
                            <Badge
                              className={`rounded-full border ${getRoleColor(
                                user.role
                              )} text-xs`}
                            >
                              {user.role}
                            </Badge>
                            <Badge
                              className={`rounded-full border ${getStatusColor(
                                user.status
                              )} text-xs`}
                            >
                              {user.status === "active" ? (
                                <BadgeCheck className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          {user.branchName && (
                            <div>
                              <span className="text-muted-foreground">
                                Branch:{" "}
                              </span>
                              <span className="font-medium">
                                {user.branchName}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">
                              Created:{" "}
                            </span>
                            <span className="font-medium">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {user.lastLogin && (
                            <div>
                              <span className="text-muted-foreground">
                                Last Login:{" "}
                              </span>
                              <span className="font-medium">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg"
                      onClick={() => onEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {users.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
              <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No users found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new user
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserList;
