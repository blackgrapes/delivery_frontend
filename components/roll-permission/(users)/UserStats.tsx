import { Users, UserCheck, UserX, UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";

interface UserStatsProps {
  users: User[];
}

const UserStats = ({ users }: UserStatsProps) => {
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {users.length}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Registered accounts
              </p>
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
                Active Users
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {activeUsers}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pending Users
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {pendingUsers}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Review
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting activation
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <UserCog className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-red-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Inactive Users
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {inactiveUsers}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Suspended
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Temporarily disabled
              </p>
            </div>
            <div className="rounded-2xl bg-red-100 p-3">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
