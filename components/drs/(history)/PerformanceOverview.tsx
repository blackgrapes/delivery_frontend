import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Target,
  IndianRupee,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";

interface PerformanceStats {
  completedDRS: number;
  averageEfficiency: number;
  totalRevenue: number;
  customerSatisfaction: number;
}

interface PerformanceOverviewProps {
  performanceStats: PerformanceStats;
}

const PerformanceOverview = ({
  performanceStats,
}: PerformanceOverviewProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Completed DRS
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {performanceStats.completedDRS}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  91%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Success rate</p>
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
                Average Efficiency
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {performanceStats.averageEfficiency}%
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  <TrendingUp className="h-3 w-3" />
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ₹{performanceStats.totalRevenue.toLocaleString()}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  COD
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Collected this month
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
                Customer Satisfaction
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {performanceStats.customerSatisfaction}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  <Star className="h-3 w-3 fill-current" />
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
