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
import { ClipboardList, Save, Package } from "lucide-react";

export default function CreateDRSPage() {
  const { can } = usePermissions();
  const [formData, setFormData] = useState({
    riderId: "",
    date: new Date().toISOString().split("T")[0],
    branchId: "",
  });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const mockOrders = [
    { id: "order-1", orderNumber: "ORD-2024-001", address: "123 Main St" },
    { id: "order-2", orderNumber: "ORD-2024-002", address: "456 Park Ave" },
    { id: "order-3", orderNumber: "ORD-2024-003", address: "789 Oak St" },
  ];

  const handleToggleOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API
    console.log("Creating DRS:", { ...formData, orders: selectedOrders });
    alert("DRS created successfully! (Mock)");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Delivery Run Sheet</h1>
        <p className="text-muted-foreground">
          Create a new DRS for rider assignment
        </p>
      </div>

      <PermissionGate action="create" resource="drs">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              DRS Details
            </CardTitle>
            <CardDescription>Enter DRS information and select orders</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="riderId">Rider *</Label>
                  <Select
                    value={formData.riderId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, riderId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rider-1">Rider 1</SelectItem>
                      <SelectItem value="rider-2">Rider 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="branchId">Branch *</Label>
                  <Select
                    value={formData.branchId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, branchId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branch-1">Mumbai Central</SelectItem>
                      <SelectItem value="branch-2">Mumbai Andheri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Orders</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleToggleOrder(order.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleToggleOrder(order.id)}
                        className="h-4 w-4"
                      />
                      <Package className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedOrders.length} order(s) selected
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={selectedOrders.length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  Create DRS
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PermissionGate>
    </div>
  );
}

