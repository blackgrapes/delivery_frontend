// components/master/locations/LocationsHeader.tsx
import { MapPin, Plus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LocationsHeaderProps {
  onAddLocation: () => void;
  locationCount: number;
}

const LocationsHeader = ({
  onAddLocation,
  locationCount,
}: LocationsHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 border-b border-border/40 pb-1">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Locations Management
            </h1>
            <p className="text-muted-foreground">
              Manage hubs, warehouses, counters, and office locations across the
              network
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 rounded-xl border-border/70">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-brand"
          onClick={onAddLocation}
        >
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>
    </div>
  );
};

export default LocationsHeader;
