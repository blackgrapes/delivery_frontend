"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Package, MapPin } from "lucide-react";

export default function RiderAllocationPage() {
  const { can } = usePermissions();
  const [selectedRider, setSelectedRider] = useState("");

  const riders = [
    {
      id: "rider-1",
      name: "Rider 1",
      phone: "+91-9876543210",
      status: "available",
      assignedOrders: 5,
    },
    {
      id: "rider-2",
      name: "Rider 2",
      phone: "+91-9876543211",
      status: "busy",
      assignedOrders: 12,
    },
  ];

  const pendingOrders = [
    { id: "order-1", orderNumber: "ORD-2024-001", address: "123 Main St" },
    { id: "order-2", orderNumber: "ORD-2024-002", address: "456 Park Ave" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Rider Allocation</h1>
        <p className="text-muted-foreground">
          Assign orders to riders for delivery
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Available Riders
            </CardTitle>
            <CardDescription>Select a rider to assign orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riders.map((rider) => (
                <div
                  key={rider.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{rider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {rider.phone} · {rider.assignedOrders} orders
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={rider.status === "available" ? "outline" : "secondary"}
                    >
                      {rider.status}
                    </Badge>
                    {can("allocate", "rider") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRider(rider.id)}
                      >
                        Select
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pending Orders
            </CardTitle>
            <CardDescription>Orders waiting for rider assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {order.address}
                    </div>
                  </div>
                  {selectedRider && can("assign_rider", "order") && (
                    <Button size="sm">Assign</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

