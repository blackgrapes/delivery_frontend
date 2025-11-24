// components/master/pincodes/PincodesHeader.tsx
import { MapPin, Plus, Download, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PincodesHeaderProps {
  onAddPincode: () => void;
  onBulkUpload: () => void;
  pincodeCount: number;
}

const PincodesHeader = ({
  onAddPincode,
  onBulkUpload,
  pincodeCount,
}: PincodesHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Pincodes Management
            </h1>
            <p className="text-muted-foreground">
              Manage serviceable pincodes, delivery timelines, and
              serviceability rules
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
          variant="outline"
          className="gap-2 rounded-xl border-border/70"
          onClick={onBulkUpload}
        >
          <Upload className="h-4 w-4" />
          Bulk Upload
        </Button>
        <Button
          className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-brand"
          onClick={onAddPincode}
        >
          <Plus className="h-4 w-4" />
          Add Pincode
        </Button>
      </div>
    </div>
  );
};

export default PincodesHeader;
