import { Package, Clock, CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsProps {
  stats: {
    totalReceived: number;
    pendingProcessing: number;
    processedToday: number;
    rejectedToday: number;
    averageProcessingTime: string;
    efficiency: number;
    weightDiscrepancies: number;
  };
}

const StatisticsCards = ({ stats }: StatsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Received
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalReceived}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Today
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipments received
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pending Processing
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.pendingProcessing}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Awaiting
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Need processing</p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Processed Today
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.processedToday}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  {stats.efficiency}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Efficiency rate</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Avg Processing Time
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stats.averageProcessingTime}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Fast
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Per shipment</p>
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

export default StatisticsCards;
