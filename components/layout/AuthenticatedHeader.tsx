"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  LogOut,
  User,
  Settings,
  Shield,
  Package,
  Building2,
  Users,
  FileText,
  BarChart3,
  MapPin,
  ClipboardList,
  Warehouse,
  Receipt,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PermissionGate } from "@/components/auth/PermissionGate";

export function AuthenticatedHeader() {
  const { session, logout } = useAuth();
  const { can, role } = usePermissions();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const userInitials = session?.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  // Get role-specific navigation items
  const getNavItems = () => {
    const items: Array<{ href: string; label: string; icon: React.ReactNode; permission?: { action: string; resource: string } }> = [];

    // SUPER ADMIN NAV ITEMS
    if (role === "super_admin") {
      if (can("view", "order")) {
        items.push({
          href: "/dashboard/orders",
          label: "Orders",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "view", resource: "order" },
        });
      }
      if (can("view", "partner")) {
        items.push({
          href: "/dashboard/partners",
          label: "Partners",
          icon: <Users className="h-4 w-4" />,
          permission: { action: "view", resource: "partner" },
        });
      }
      if (can("view", "branch")) {
        items.push({
          href: "/dashboard/branches",
          label: "Branches",
          icon: <Building2 className="h-4 w-4" />,
          permission: { action: "view", resource: "branch" },
        });
      }
      if (can("view", "user")) {
        items.push({
          href: "/dashboard/users",
          label: "Users",
          icon: <Users className="h-4 w-4" />,
          permission: { action: "view", resource: "user" },
        });
      }
      if (can("view", "report")) {
        items.push({
          href: "/dashboard/reports",
          label: "Reports",
          icon: <BarChart3 className="h-4 w-4" />,
          permission: { action: "view", resource: "report" },
        });
      }
      if (can("view", "gst")) {
        items.push({
          href: "/dashboard/gst/reports",
          label: "GST",
          icon: <Receipt className="h-4 w-4" />,
          permission: { action: "view", resource: "gst" },
        });
      }
    }

    // PARTNER ADMIN NAV ITEMS
    else if (role === "partner_admin") {
      if (can("view", "order")) {
        items.push({
          href: "/dashboard/orders",
          label: "Orders",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "view", resource: "order" },
        });
      }
      if (can("view", "branch")) {
        items.push({
          href: "/dashboard/branches",
          label: "Branches",
          icon: <Building2 className="h-4 w-4" />,
          permission: { action: "view", resource: "branch" },
        });
      }
      if (can("view", "report")) {
        items.push({
          href: "/dashboard/reports",
          label: "Reports",
          icon: <BarChart3 className="h-4 w-4" />,
          permission: { action: "view", resource: "report" },
        });
      }
      if (can("view", "invoice")) {
        items.push({
          href: "/dashboard/invoices",
          label: "Invoices",
          icon: <Receipt className="h-4 w-4" />,
          permission: { action: "view", resource: "invoice" },
        });
      }
    }

    // BRANCH ADMIN NAV ITEMS
    else if (role === "branch_admin") {
      if (can("view", "order")) {
        items.push({
          href: "/dashboard/orders",
          label: "Orders",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "view", resource: "order" },
        });
      }
      if (can("view", "drs")) {
        items.push({
          href: "/dashboard/drs/active",
          label: "DRS",
          icon: <FileText className="h-4 w-4" />,
          permission: { action: "view", resource: "drs" },
        });
      }
      if (can("view", "rider")) {
        items.push({
          href: "/dashboard/riders/allocation",
          label: "Riders",
          icon: <Users className="h-4 w-4" />,
          permission: { action: "view", resource: "rider" },
        });
      }
      if (can("view", "report")) {
        items.push({
          href: "/dashboard/reports",
          label: "Reports",
          icon: <BarChart3 className="h-4 w-4" />,
          permission: { action: "view", resource: "report" },
        });
      }
    }

    // WAREHOUSE ADMIN NAV ITEMS
    else if (role === "warehouse_admin") {
      if (can("view", "warehouse")) {
        items.push({
          href: "/dashboard/warehouse/inventory",
          label: "Inventory",
          icon: <Warehouse className="h-4 w-4" />,
          permission: { action: "view", resource: "warehouse" },
        });
      }
      if (can("view", "manifest")) {
        items.push({
          href: "/dashboard/manifest/counter/inward",
          label: "Manifests",
          icon: <FileText className="h-4 w-4" />,
          permission: { action: "view", resource: "manifest" },
        });
      }
    }

    // DISPATCHER NAV ITEMS
    else if (role === "dispatcher") {
      if (can("view", "order")) {
        items.push({
          href: "/dashboard/orders",
          label: "Orders",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "view", resource: "order" },
        });
      }
      if (can("view", "drs")) {
        items.push({
          href: "/dashboard/drs/active",
          label: "DRS",
          icon: <FileText className="h-4 w-4" />,
          permission: { action: "view", resource: "drs" },
        });
      }
      if (can("view", "rider")) {
        items.push({
          href: "/dashboard/riders/allocation",
          label: "Riders",
          icon: <Users className="h-4 w-4" />,
          permission: { action: "view", resource: "rider" },
        });
      }
    }

    // RIDER NAV ITEMS
    else if (role === "rider") {
      if (can("view", "pod")) {
        items.push({
          href: "/dashboard/rider/tasks",
          label: "My Tasks",
          icon: <ClipboardList className="h-4 w-4" />,
          permission: { action: "view", resource: "pod" },
        });
      }
      if (can("capture", "pod")) {
        items.push({
          href: "/dashboard/rider/pod",
          label: "POD",
          icon: <FileText className="h-4 w-4" />,
          permission: { action: "capture", resource: "pod" },
        });
      }
    }

    // CUSTOMER NAV ITEMS
    else if (role === "customer") {
      if (can("view", "order")) {
        items.push({
          href: "/dashboard/customer/orders",
          label: "My Orders",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "view", resource: "order" },
        });
      }
      if (can("track", "tracking")) {
        items.push({
          href: "/dashboard/tracking",
          label: "Track",
          icon: <MapPin className="h-4 w-4" />,
          permission: { action: "track", resource: "tracking" },
        });
      }
      if (can("create", "booking")) {
        items.push({
          href: "/dashboard/customer/booking",
          label: "Book",
          icon: <Package className="h-4 w-4" />,
          permission: { action: "create", resource: "booking" },
        });
      }
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Truck className="h-6 w-6" />
          <span className="text-xl font-bold">LogiFlow</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Role-specific navigation items */}
          {navItems.map((item) => {
            // Check permission before rendering
            if (item.permission && !can(item.permission.action as any, item.permission.resource as any)) {
              return null;
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session?.user.email}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="secondary" className="text-xs">
                      {session?.user.role.replace("_", " ")}
                    </Badge>
                    {session?.isImpersonating && (
                      <Badge variant="destructive" className="text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        Impersonating
                      </Badge>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <PermissionGate action="view" resource="system_settings">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </PermissionGate>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
