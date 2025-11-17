// app/dashboard/manifest/history/components/StatisticsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  Truck,
  AlertCircle,
} from "lucide-react";

interface StatsProps {
  stats: {
    totalManifests: number;
    completed: number;
    inProgress: number;
    delayed: number;
    onTimeRate: number;
    averageDeliveryTime: string;
  };
}

const StatisticsSection = ({ stats }: StatsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-indigo-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Manifests
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalManifests}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  30 Days
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Historical records
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-100 p-3">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Completed
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.completed}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  {Math.round((stats.completed / stats.totalManifests) * 100)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                On-Time Rate
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.onTimeRate}%
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  +2.5%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Delivery performance
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Avg Delivery Time
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.averageDeliveryTime}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  -15min
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Improvement vs last month
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;
