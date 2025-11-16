// app/dashboard/manifest/dispatch/components/QuickActions.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Package, Clock, RefreshCw, Upload } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Dispatch Tools
            </p>
            <p className="text-xs text-muted-foreground">
              Quick actions for dispatch management
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Truck className="h-4 w-4" />
              Assign Vehicle
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <MapPin className="h-4 w-4" />
              Plan Route
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Package className="h-4 w-4" />
              Load Manifest
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Clock className="h-4 w-4" />
              Schedule Dispatch
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Upload className="h-4 w-4" />
              Bulk Update
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
