"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash2 } from "lucide-react";

export default function AWBSeriesPage() {
  const { can } = usePermissions();
  const [series, setSeries] = useState([
    {
      id: "series-1",
      name: "Mumbai Series A",
      from: "AWB-001",
      to: "AWB-1000",
      used: 450,
      available: 550,
      branch: "Mumbai Central",
    },
  ]);

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AWB Series</h1>
          <p className="text-muted-foreground">
            Manage AWB number series and allocation
          </p>
        </div>
        <PermissionGate action="create" resource="awb">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Series
          </Button>
        </PermissionGate>
      </div>

      <div className="space-y-4">
        {series.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {s.name}
                  </CardTitle>
                  <CardDescription>{s.branch}</CardDescription>
                </div>
                <Badge variant="outline">
                  {s.available} available
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="font-medium">{s.from}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">To</p>
                  <p className="font-medium">{s.to}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Used</p>
                  <p className="font-medium">{s.used}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available</p>
                  <p className="font-medium">{s.available}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {can("update", "awb") && (
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
                {can("delete", "awb") && (
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

