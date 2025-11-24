import { Shield, Users, Key, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Role } from "./types";

interface RolesStatsProps {
  roles: Role[];
}

const RolesStats = ({ roles }: RolesStatsProps) => {
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);
  const systemRoles = roles.filter((role) => role.isSystem).length;
  const customRoles = roles.filter((role) => !role.isSystem).length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Roles
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {roles.length}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                System & custom roles
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {totalUsers}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Assigned
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                System Roles
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {systemRoles}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Protected
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Pre-defined roles</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Custom Roles
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {customRoles}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Editable
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                User-defined roles
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Key className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesStats;
