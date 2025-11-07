"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileCheck, Package, Save, QrCode } from "lucide-react";

export default function CreateForwardingManifestPage() {
  const { can } = usePermissions();
  const [formData, setFormData] = useState({
    destinationBranch: "",
    bagTag: "",
  });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const mockOrders = [
    { id: "order-1", orderNumber: "ORD-2024-001", destination: "Delhi" },
    { id: "order-2", orderNumber: "ORD-2024-002", destination: "Delhi" },
    { id: "order-3", orderNumber: "ORD-2024-003", destination: "Bangalore" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API
    console.log("Creating forwarding manifest:", {
      ...formData,
      orders: selectedOrders,
    });
    alert("Forwarding manifest created! (Mock)");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Forwarding Manifest</h1>
        <p className="text-muted-foreground">
          Create manifest for dispatch to branches/agents
        </p>
      </div>

      <PermissionGate action="create" resource="manifest">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Manifest Details
            </CardTitle>
            <CardDescription>Enter manifest information and select consignments</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="destinationBranch">Destination Branch *</Label>
                  <Select
                    value={formData.destinationBranch}
                    onValueChange={(value) =>
                      setFormData({ ...formData, destinationBranch: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi Central</SelectItem>
                      <SelectItem value="bangalore">Bangalore Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bagTag">Bag Tag</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bagTag"
                      value={formData.bagTag}
                      onChange={(e) =>
                        setFormData({ ...formData, bagTag: e.target.value })
                      }
                      placeholder="Scan bag tag"
                    />
                    <Button type="button" variant="outline">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Consignments</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setSelectedOrders((prev) =>
                          prev.includes(order.id)
                            ? prev.filter((id) => id !== order.id)
                            : [...prev, order.id]
                        );
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => {}}
                        className="h-4 w-4"
                      />
                      <Package className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.destination}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedOrders.length} consignment(s) selected
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={selectedOrders.length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  Create Manifest
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PermissionGate>
    </div>
  );
}

