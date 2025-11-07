"use client";

import { useState, useEffect } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, TrendingUp, Building2 } from "lucide-react";
import { mockApi } from "@/mock-api/api";
import type { Tenant } from "@/types";

export default function PartnersPage() {
  const { can } = usePermissions();
  const [partners, setPartners] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await mockApi.getTenants();
      setPartners(data.filter((t) => t.type === "partner"));
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground">
            Manage partner network and performance
          </p>
        </div>
        <PermissionGate action="create" resource="partner">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </PermissionGate>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {partner.name}
                </CardTitle>
                {partner.isActive ? (
                  <Badge variant="outline">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
              <CardDescription>{partner.city}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">City:</span>
                  <span className="font-medium">{partner.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {partner.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="pt-4 flex gap-2">
                  {can("view", "partner") && (
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  )}
                  {can("manage", "partner") && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage
                    </Button>
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

