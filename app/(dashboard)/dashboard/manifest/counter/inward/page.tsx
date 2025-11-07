"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileCheck, QrCode, Package, Save } from "lucide-react";

export default function CounterManifestInwardPage() {
  const { can } = usePermissions();
  const [awbNumber, setAwbNumber] = useState("");
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  const handleScan = () => {
    if (awbNumber && !scannedItems.includes(awbNumber)) {
      setScannedItems([...scannedItems, awbNumber]);
      setAwbNumber("");
    }
  };

  const handleBulkInward = () => {
    // TODO: Replace with real API
    console.log("Processing bulk inward:", scannedItems);
    alert("Bulk inward processed! (Mock)");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Counter Manifest - Inward Processing</h1>
        <p className="text-muted-foreground">
          Process inward consignments from branches/agents
        </p>
      </div>

      <PermissionGate action="manage" resource="manifest">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Scan AWB
              </CardTitle>
              <CardDescription>Scan or enter AWB number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="awb">AWB Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="awb"
                      value={awbNumber}
                      onChange={(e) => setAwbNumber(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleScan()}
                      placeholder="Scan or enter AWB"
                    />
                    <Button onClick={handleScan}>
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleBulkInward} className="w-full" disabled={scannedItems.length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  Process Bulk Inward ({scannedItems.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Scanned Items
              </CardTitle>
              <CardDescription>{scannedItems.length} items scanned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {scannedItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No items scanned yet
                  </p>
                ) : (
                  scannedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <span className="text-sm font-medium">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setScannedItems(scannedItems.filter((_, i) => i !== idx))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </PermissionGate>
    </div>
  );
}

