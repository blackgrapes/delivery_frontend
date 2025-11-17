import { Truck, QrCode, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "./StatusBadge";
import ConnectivityBadge from "./ConnectivityBadge";

interface DRSListProps {
  filteredDRS: any[];
  selectedDRS: any;
  setSelectedDRS: (drs: any) => void;
}

const DRSList = ({
  filteredDRS,
  selectedDRS,
  setSelectedDRS,
}: DRSListProps) => {
  const getTimeRemaining = (expectedEnd: string) => {
    const now = new Date();
    const end = new Date(expectedEnd);
    const diffMs = end.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffMs < 0)
      return `Overdue by ${Math.abs(diffHrs)}h ${Math.abs(diffMins)}m`;
    return `${diffHrs}h ${diffMins}m remaining`;
  };

  return (
    <div className="xl:col-span-1 space-y-4">
      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
        <CardContent className="p-6">
          <div className="space-y-3">
            {filteredDRS.map((drs) => (
              <Card
                key={drs.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedDRS.id === drs.id
                    ? "border-primary shadow-lg"
                    : "border-border/70 hover:border-primary/50"
                } rounded-xl`}
                onClick={() => setSelectedDRS(drs)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-semibold text-foreground">
                          {drs.drsNumber}
                        </p>
                        <QrCode className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <StatusBadge status={drs.status} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rider:</span>
                        <span className="font-medium">{drs.rider.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-medium">
                          {drs.progress.completion}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <ConnectivityBadge status={drs.location.connectivity} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress
                        value={drs.progress.completion}
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {drs.progress.delivered}/{drs.progress.totalShipments}{" "}
                          delivered
                        </span>
                        <span>
                          {getTimeRemaining(drs.timeline.expectedEnd)}
                        </span>
                      </div>
                    </div>

                    {drs.alerts.length > 0 && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-600">
                          {drs.alerts.length} alert
                          {drs.alerts.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDRS.length === 0 && (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No active DRS found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DRSList;
