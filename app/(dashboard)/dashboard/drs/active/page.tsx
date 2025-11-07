"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Truck, Package, MapPin } from "lucide-react";

export default function ActiveDRSPage() {
  const drsList = [
    {
      id: "drs-1",
      drsNumber: "DRS-2024-001",
      rider: "Rider Name",
      date: "2024-01-15",
      totalOrders: 25,
      delivered: 18,
      pending: 7,
      status: "active",
    },
    {
      id: "drs-2",
      drsNumber: "DRS-2024-002",
      rider: "Another Rider",
      date: "2024-01-15",
      totalOrders: 30,
      delivered: 22,
      pending: 8,
      status: "active",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Active DRS</h1>
        <p className="text-muted-foreground">
          View and manage active delivery run sheets
        </p>
      </div>

      <div className="space-y-4">
        {drsList.map((drs) => (
          <Card key={drs.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    {drs.drsNumber}
                  </CardTitle>
                  <CardDescription>
                    {drs.rider} · {new Date(drs.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-2xl font-bold">{drs.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{drs.delivered}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{drs.pending}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Progress</p>
                  <p className="text-2xl font-bold">
                    {Math.round((drs.delivered / drs.totalOrders) * 100)}%
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

