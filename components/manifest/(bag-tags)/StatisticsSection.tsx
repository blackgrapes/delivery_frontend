// app/dashboard/manifest/bag-tags/components/StatisticsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Tag, CheckCircle2, AlertCircle, Truck } from "lucide-react";

interface StatsProps {
  stats: {
    totalBags: number;
    activeBags: number;
    sealedToday: number;
    inTransit: number;
    delivered: number;
    pendingSealing: number;
  };
}

const StatisticsSection = ({ stats }: StatsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Bags
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalBags}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Bags in system</p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Sealed Today
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.sealedToday}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  New
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Bags sealed today</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                In Transit
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.inTransit}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Moving
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Bags in transit</p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pending Sealing
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.pendingSealing}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Action
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Need sealing</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <AlertCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;
