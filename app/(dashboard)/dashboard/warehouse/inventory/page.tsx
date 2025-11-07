"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Warehouse, Search, Package, TrendingUp, TrendingDown } from "lucide-react";

export default function InventoryPage() {
  const inventory = [
    {
      id: "item-1",
      sku: "SKU-001",
      name: "Standard Package",
      quantity: 1250,
      location: "A-12",
      status: "in_stock",
    },
    {
      id: "item-2",
      sku: "SKU-002",
      name: "Express Package",
      quantity: 850,
      location: "B-05",
      status: "low_stock",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage warehouse inventory
          </p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4">
        {inventory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Warehouse className="h-5 w-5" />
                    {item.name}
                  </CardTitle>
                  <CardDescription>{item.sku}</CardDescription>
                </div>
                <Badge
                  variant={item.status === "in_stock" ? "outline" : "secondary"}
                >
                  {item.status === "in_stock" ? "In Stock" : "Low Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <p className="text-2xl font-bold">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-medium">{item.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-medium">
                    {item.status === "in_stock" ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-orange-600">Low Stock</span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

