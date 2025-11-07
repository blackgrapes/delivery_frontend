"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Plus, Search } from "lucide-react";

export default function LocationMasterPage() {
  const locations = [
    {
      id: "loc-1",
      name: "Mumbai Central",
      city: "Mumbai",
      pincode: "400008",
      state: "Maharashtra",
    },
    {
      id: "loc-2",
      name: "Delhi Connaught Place",
      city: "Delhi",
      pincode: "110001",
      state: "Delhi",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location Master</h1>
          <p className="text-muted-foreground">
            Manage location master data
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {location.name}
              </CardTitle>
              <CardDescription>{location.city}, {location.state}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pincode:</span>
                  <span className="font-medium">{location.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">City:</span>
                  <span className="font-medium">{location.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">State:</span>
                  <span className="font-medium">{location.state}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

