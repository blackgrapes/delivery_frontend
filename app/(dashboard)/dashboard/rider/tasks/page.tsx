"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Phone, CheckCircle2, Camera } from "lucide-react";

export default function RiderTasksPage() {
  const { session } = useAuth();
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      orderNumber: "ORD-2024-001",
      customerName: "John Doe",
      pickupAddress: "123 Main St, Mumbai",
      deliveryAddress: "456 Park Ave, Mumbai",
      phone: "+91-9876543210",
      status: "assigned",
      priority: "high",
    },
    {
      id: "task-2",
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      pickupAddress: "789 Oak St, Mumbai",
      deliveryAddress: "012 Pine Ave, Mumbai",
      phone: "+91-9876543211",
      status: "in_transit",
      priority: "medium",
    },
  ]);

  const handleUpdateStatus = (taskId: string, status: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      assigned: "secondary",
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
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">
          View and manage your assigned delivery tasks
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {task.orderNumber}
                </CardTitle>
                {getStatusBadge(task.status)}
              </div>
              <CardDescription>{task.customerName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Pickup Address</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{task.pickupAddress}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Delivery Address</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{task.deliveryAddress}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Contact</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{task.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  {task.status === "assigned" && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, "in_transit")}
                      className="flex-1"
                    >
                      Start Delivery
                    </Button>
                  )}
                  {task.status === "in_transit" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(task.id, "delivered")}
                        className="flex-1"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Delivered
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Camera className="mr-2 h-4 w-4" />
                        Capture POD
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

