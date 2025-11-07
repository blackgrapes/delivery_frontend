"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import type { UserRole, Resource, Action } from "@/types";
import { mockApi } from "@/mock-api/api";

const allResources: Resource[] = [
  "branch",
  "warehouse",
  "order",
  "invoice",
  "partner",
  "user",
  "shipment",
  "manifest",
  "pod",
  "customer",
  "report",
  "gst",
  "booking",
  "awb",
  "drs",
  "tracking",
  "rider",
  "vendor",
  "pickup",
  "exception",
  "master_data",
  "system_settings",
];

const allRoles: UserRole[] = [
  "super_admin",
  "partner_admin",
  "branch_admin",
  "warehouse_admin",
  "dispatcher",
  "rider",
  "customer",
];

export default function PermissionsPage() {
  const { can } = usePermissions();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Permissions Matrix</h1>
        <p className="text-muted-foreground">
          View and manage role-based permissions across all resources
        </p>
      </div>

      <div className="space-y-6">
        {allRoles.map((role) => {
          const permissions = mockApi.getPermissions(role);
          return (
            <Card key={role}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {role.replace("_", " ").toUpperCase()}
                </CardTitle>
                <CardDescription>
                  Permissions for {role.replace("_", " ")} role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Resource</th>
                        <th className="text-left p-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allResources.map((resource) => {
                        const actions = permissions[resource] || [];
                        return (
                          <tr key={resource} className="border-b">
                            <td className="p-2 font-medium">
                              {resource.replace("_", " ")}
                            </td>
                            <td className="p-2">
                              {actions.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {actions.map((action) => (
                                    <Badge
                                      key={action}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {action}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-xs">
                                  No permissions
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

