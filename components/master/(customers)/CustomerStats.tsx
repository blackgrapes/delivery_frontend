// components/master/customers/CustomerStats.tsx
import { Users, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer } from "./types";

interface CustomerStatsProps {
  customers: Customer[];
}

const CustomerStats = ({ customers }: CustomerStatsProps) => {
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const inactiveCustomers = customers.filter(
    (c) => c.status === "inactive"
  ).length;
  const interstateCustomers = customers.filter(
    (c) => c.isInterStateDealer
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Customers
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {customers.length}
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
                Active Customers
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {activeCustomers}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Inactive Customers
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {inactiveCustomers}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Suspended
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Temporarily inactive
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <XCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Inter-State Dealers
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {interstateCustomers}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  GST
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Cross-state operations
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;
