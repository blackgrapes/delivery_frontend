// components/master/locations/LocationsStats.tsx
import {
  MapPin,
  Building,
  Warehouse,
  Store,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Location } from "./types";

interface LocationsStatsProps {
  locations: Location[];
}

const LocationsStats = ({ locations }: LocationsStatsProps) => {
  const activeLocations = locations.filter((l) => l.status === "active").length;
  const hubs = locations.filter((l) => l.type === "hub").length;
  const warehouses = locations.filter((l) => l.type === "warehouse").length;
  const counters = locations.filter((l) => l.type === "counter").length;
  const operationalLocations = locations.filter((l) => l.isOperational).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hub":
        return <Building className="h-6 w-6 text-blue-600" />;
      case "warehouse":
        return <Warehouse className="h-6 w-6 text-green-600" />;
      case "counter":
        return <Store className="h-6 w-6 text-orange-600" />;
      case "office":
        return <Settings className="h-6 w-6 text-purple-600" />;
      default:
        return <MapPin className="h-6 w-6 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hub":
        return "text-blue-600";
      case "warehouse":
        return "text-green-600";
      case "counter":
        return "text-orange-600";
      case "office":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Locations
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {locations.length}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Network
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Across all types</p>
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
                Active Locations
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {activeLocations}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Operational
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {operationalLocations} currently operational
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <Building className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Service Hubs
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {hubs}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Critical
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Main distribution hubs
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <Warehouse className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Customer Counters
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {counters}
                </span>
                <Badge variant="info" className="rounded-full text-xs">
                  Frontline
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Customer service points
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Store className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationsStats;
