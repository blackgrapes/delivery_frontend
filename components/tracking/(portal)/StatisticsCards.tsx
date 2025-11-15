import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, Truck, BarChart3 } from "lucide-react";

interface StatisticsCardsProps {
  stats: {
    totalActive: number;
    deliveredToday: number;
    inTransit: number;
    exceptions: number;
    onTimeRate: number;
    customerSatisfaction: number;
  };
}

const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Active Trackings
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalActive}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently being tracked
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Eye className="h-6 w-6 text-blue-600" />
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
              <p className="text-xs text-muted-foreground">Active shipments</p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Customer Satisfaction
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.customerSatisfaction}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Rating
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Average customer rating
              </p>
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

export default StatisticsCards;
