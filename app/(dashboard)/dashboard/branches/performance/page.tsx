"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Package, Clock } from "lucide-react";

export default function BranchPerformancePage() {
  const branches = [
    {
      id: "branch-1",
      name: "Mumbai Central",
      totalOrders: 1247,
      delivered: 1180,
      onTimeDelivery: 94.5,
      avgDeliveryTime: "2.5 hours",
      trend: "up",
    },
    {
      id: "branch-2",
      name: "Mumbai Andheri",
      totalOrders: 892,
      delivered: 845,
      onTimeDelivery: 91.2,
      avgDeliveryTime: "3.1 hours",
      trend: "up",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Branch Performance</h1>
        <p className="text-muted-foreground">
          View performance metrics for all branches
        </p>
      </div>

      <div className="grid gap-6">
        {branches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {branch.name}
                  </CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-2xl font-bold">{branch.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{branch.delivered}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">On-Time Delivery</p>
                  <p className="text-2xl font-bold">{branch.onTimeDelivery}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">{branch.avgDeliveryTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

