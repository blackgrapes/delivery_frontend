"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Package, Clock, CheckCircle2 } from "lucide-react";

export default function PartnerScorecardsPage() {
  const scorecards = [
    {
      id: "partner-1",
      name: "Fast Delivery Partners",
      city: "Mumbai",
      performance: 95,
      onTimeDelivery: 94.5,
      totalShipments: 1247,
      avgDeliveryTime: "2.5 hours",
      trend: "up",
    },
    {
      id: "partner-2",
      name: "Express Logistics",
      city: "Delhi",
      performance: 88,
      onTimeDelivery: 87.2,
      totalShipments: 892,
      avgDeliveryTime: "3.2 hours",
      trend: "down",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Partner Performance Scorecards</h1>
        <p className="text-muted-foreground">
          View performance metrics for all partners
        </p>
      </div>

      <div className="grid gap-6">
        {scorecards.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{partner.name}</CardTitle>
                  <CardDescription>{partner.city}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={partner.performance >= 90 ? "outline" : "secondary"}
                    className="text-lg"
                  >
                    {partner.performance}%
                  </Badge>
                  {partner.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">On-Time Delivery</p>
                  <p className="text-2xl font-bold">{partner.onTimeDelivery}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Shipments</p>
                  <p className="text-2xl font-bold">{partner.totalShipments}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">{partner.avgDeliveryTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Performance Score</p>
                  <p className="text-2xl font-bold">{partner.performance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

