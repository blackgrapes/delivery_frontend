"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Search, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState<any>(null);

  const handleTrack = () => {
    // Mock tracking
    setOrder({
      id: "order-1",
      orderNumber: trackingNumber || "ORD-2024-001",
      status: "in_transit",
      pickupAddress: "123 Pickup Street, Mumbai",
      deliveryAddress: "456 Delivery Avenue, Mumbai",
      createdAt: "2024-01-15T10:00:00Z",
      estimatedDelivery: "2024-01-16T18:00:00Z",
      rider: "Rider Name",
      phone: "+91-9876543210",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      in_transit: "default",
      delivered: "outline",
      cancelled: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Track Order</h1>
        <p className="text-muted-foreground">
          Enter your order number to track your shipment
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
          <CardDescription>Enter your order number below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter order number (e.g., ORD-2024-001)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button onClick={handleTrack}>
              <Search className="mr-2 h-4 w-4" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {order && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {order.orderNumber}
                </CardTitle>
                <CardDescription>Order Details</CardDescription>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium mb-1">Pickup Address</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{order.pickupAddress}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Delivery Address</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium mb-1">Order Date</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Estimated Delivery</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {new Date(order.estimatedDelivery).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {order.rider && (
                <div>
                  <p className="text-sm font-medium mb-1">Assigned Rider</p>
                  <p className="text-sm text-muted-foreground">
                    {order.rider} ({order.phone})
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

