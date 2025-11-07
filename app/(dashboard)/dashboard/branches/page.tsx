"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, MapPin, Phone } from "lucide-react";

export default function BranchesPage() {
  const { session } = useAuth();
  const { can, allowedActions } = usePermissions();

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branches</h1>
          <p className="text-muted-foreground">
            Manage your branch network
          </p>
        </div>
        <PermissionGate action="create" resource="branch">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Branch
          </Button>
        </PermissionGate>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {session?.branches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {branch.name}
                </CardTitle>
                {branch.isActive ? (
                  <Badge variant="outline">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
              <CardDescription>{branch.city}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{branch.phone}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  {allowedActions("branch").includes("manage") && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage
                    </Button>
                  )}
                  {allowedActions("branch").includes("assign_staff") && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Staff
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!session?.branches || session.branches.length === 0) && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No branches assigned
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

