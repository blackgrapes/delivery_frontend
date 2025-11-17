import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, IndianRupee, BarChart3, Zap } from "lucide-react";

interface DRSStatsProps {
  stats: {
    totalShipments: number;
    totalCOD: number;
    totalWeight: number;
    priorityShipments: number;
  };
}

const DRSStats = ({ stats }: DRSStatsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Selected Shipments
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalShipments}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for assignment
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total COD Value
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ₹{stats.totalCOD}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Cash
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">To be collected</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Weight
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalWeight} kg
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Load
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Package weight</p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Priority Shipments
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.priorityShipments}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Urgent
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Critical & High priority
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DRSStats;
