// components/master/pincodes/PincodesStats.tsx
import {
  MapPin,
  Clock,
  Truck,
  Package,
  CheckCircle2,
  XCircle,
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
  const pickupAvailable = pincodes.filter((p) => p.pickupAvailable).length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Pincodes
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {pincodes.length}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Serviceable areas</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Active Pincodes
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {activePincodes}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently serviceable
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
                Express Service
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {expressService}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Fast
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Same/Next day delivery
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                COD Available
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {codAvailable}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Cash
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Cash on delivery</p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PincodesStats;
