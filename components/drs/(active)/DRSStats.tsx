import { PlayCircle, CheckCircle2, IndianRupee, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DRSStatsProps {
  stats: {
    totalActive: number;
    completedToday: number;
    totalRiders: number;
    averageEfficiency: number;
    totalCODCollection: number;
    onTimeDelivery: number;
    pendingShipments: number;
    activeRiders: number;
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
                Active DRS
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalActive}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <PlayCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Completed Today
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.completedToday}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  {stats.onTimeDelivery}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                On-time delivery rate
              </p>
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
                COD Collection
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ₹{stats.totalCODCollection}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Today
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Total cash collected
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <IndianRupee className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Average Efficiency
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.averageEfficiency}%
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Performance
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Across all riders</p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DRSStats;
