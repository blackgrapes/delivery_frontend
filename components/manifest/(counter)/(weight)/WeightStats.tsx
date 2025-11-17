import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, AlertCircle, IndianRupee, BarChart3 } from "lucide-react";
import { weightStats } from "./data";

const WeightStats = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Processed
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {weightStats.totalProcessed}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Today
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Weight entries</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Scale className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-red-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Discrepancies Found
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {weightStats.discrepanciesFound}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Issues
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </div>
            <div className="rounded-2xl bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Revenue Recovery
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ₹{weightStats.revenueRecovery}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Recovered
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                From weight corrections
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Accuracy Rate
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {weightStats.accuracyRate}%
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Quality
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Weight declaration accuracy
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

export default WeightStats;
