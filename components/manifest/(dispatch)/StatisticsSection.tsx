// app/dashboard/manifest/dispatch/components/StatisticsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  MapPin,
} from "lucide-react";

interface StatsProps {
  stats: {
    totalDispatches: number;
    pendingDispatch: number;
    inTransit: number;
    deliveredToday: number;
    delayed: number;
    onTimeRate: number;
  };
}

const StatisticsSection = ({ stats }: StatsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-red-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Dispatches
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalDispatches}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Today's dispatches
              </p>
            </div>
            <div className="rounded-2xl bg-red-100 p-3">
              <Truck className="h-6 w-6 text-red-600" />
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
              <p className="text-xs text-muted-foreground">Currently on road</p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Delivered Today
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.deliveredToday}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  {stats.onTimeRate}%
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

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-yellow-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Delayed
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.delayed}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Issues
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </div>
            <div className="rounded-2xl bg-yellow-100 p-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;
