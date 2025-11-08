"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  LayoutGrid,
  Menu,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  UserCircle2,
  LogOut,
  Shield,
  Truck,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";

export function AuthenticatedHeader() {
  const { session, logout } = useAuth();
  const { can, role } = usePermissions();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const userInitials =
    session?.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const getNavItems = () => {
    const items: Array<{
      href: string;
      label: string;
      icon: React.ReactNode;
      permission?: { action: string; resource: string };
    }> = [];

    if (role === "super_admin") {
      if (can("view", "order"))
        items.push({
          href: "/dashboard/orders",
          label: "Orders",
          icon: <Truck className="h-4 w-4" />,
        });
      if (can("view", "report"))
        items.push({
          href: "/dashboard/reports",
          label: "Reports",
          icon: <Settings className="h-4 w-4" />,
        });
    }
    return items;
  };

  const navItems = getNavItems();

  const currentPageLabel = useMemo(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    return pathParts[pathParts.length - 1]?.replace(/-/g, " ") || "Overview";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-col lg:hidden">
            <span className="text-base font-semibold text-foreground">
              {currentPageLabel}
            </span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>

        <div className="ml-auto flex flex-1 items-center gap-2 lg:flex-none">
          <div className="relative hidden flex-1 items-center md:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shipments, branches, partners, GST..."
              className="h-11 rounded-lg border-border/80 pl-10 pr-24 text-sm shadow-inner"
            />
            <div className="pointer-events-none absolute right-12 hidden items-center gap-1 text-xs font-medium text-muted-foreground xl:flex">
              <kbd className="rounded-md bg-muted px-2 py-1">⌘</kbd>
              <span>F</span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="absolute right-1 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border-border/70 px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground md:flex"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 border-0 bg-destructive px-1 py-0 text-[0.65rem] leading-none text-destructive-foreground">
              12
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open workspace">
                <LayoutGrid className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Workspace Shortcuts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Shipment Command Center</DropdownMenuItem>
              <DropdownMenuItem>Branch Analytics Hub</DropdownMenuItem>
              <DropdownMenuItem>GST Compliance Room</DropdownMenuItem>
              <DropdownMenuItem>Partner Collaboration Desk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden items-center gap-2 xl:flex">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-border/80"
            >
              <Plus className="h-4 w-4" />
              Add Branch
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold shadow-brand hover:bg-primary/90"
            >
              Create Shipment
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-2 py-1 pr-3 text-left shadow-card hover:bg-card"
                variant="ghost"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://i.pravatar.cc/100?img=12"
                    alt={session?.user.name || "User"}
                  />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left text-xs sm:block">
                  <p className="text-sm font-semibold text-foreground">
                    {session?.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user.role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2">
                <UserCircle2 className="h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {session?.isImpersonating && (
                <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                  <Shield className="h-4 w-4" />
                  Impersonating Mode
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <PermissionGate action="view" resource="system_settings">
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
              </PermissionGate>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
