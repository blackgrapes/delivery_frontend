// app/dashboard/manifest/bag-tags/components/QuickActions.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Scan, Package, Download, Upload, QrCode } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Bag Tag Tools</p>
            <p className="text-xs text-muted-foreground">
              Quick actions for bag tag management
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Printer className="h-4 w-4" />
              Bulk Print
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Scan className="h-4 w-4" />
              Scan Bag
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Package className="h-4 w-4" />
              Create Multiple
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <QrCode className="h-4 w-4" />
              Generate QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
