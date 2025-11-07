"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import { mockApi } from "@/mock-api/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, Shield } from "lucide-react";
import type { User } from "@/types";

export default function UsersPage() {
  const { session } = useAuth();
  const { can, allowedActions } = usePermissions();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await mockApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant="secondary" className="capitalize">
        {role.replace("_", " ")}
      </Badge>
    );
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage system users and permissions
          </p>
        </div>
        <PermissionGate action="create" resource="user">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </PermissionGate>
      </div>

      <div className="space-y-4">
        {users.map((user) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleBadge(user.role)}
                    {user.isActive ? (
                      <Badge variant="outline">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {allowedActions("user").includes("manage") && (
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                  {allowedActions("user").includes("assign_roles") && (
                    <Button variant="outline" size="sm">
                      Assign Role
                    </Button>
                  )}
                  {allowedActions("user").includes("impersonate") && (
                    <ImpersonateUser />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

