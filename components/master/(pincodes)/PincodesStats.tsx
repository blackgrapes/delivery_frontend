
import {
  MapPin,
  Clock,
  Package,
  Navigation,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pincode } from "./types";

interface PincodesStatsProps {
  pincodes: Pincode[];
}

const PincodesStats = ({ pincodes }: PincodesStatsProps) => {
  const activePincodes = pincodes.filter((p) => p.status === "active").length;
  const expressService = pincodes.filter(
    (p) => p.serviceability === "express" || p.serviceability === "same_day"
  ).length;
  const codAvailable = pincodes.filter((p) => p.codAvailable).length;
  const total = pincodes.length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Total Coverage</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight">{total}</h3>
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs">
                  Pincodes
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Live Areas</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight text-green-600">{activePincodes}</h3>
                <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-green-600 text-xs">
                  Serviceable
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-2xl">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Express Lane</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight text-purple-600">{expressService}</h3>
                <Badge variant="outline" className="border-purple-500/20 bg-purple-500/5 text-purple-600 text-xs">
                  Fast Track
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">COD Enabled</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight text-blue-600">{codAvailable}</h3>
                <Badge variant="outline" className="border-blue-500/20 bg-blue-500/5 text-blue-600 text-xs">
                  Pay on Del.
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PincodesStats;
