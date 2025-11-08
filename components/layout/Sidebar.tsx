"use client";

import { useState, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { getNavigationForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Building2,
  Warehouse,
  Truck,
  MapPin,
  ClipboardList,
  BarChart3,
  Settings,
  CreditCard,
  FileCheck,
  QrCode,
  ListChecks,
  UserCheck,
  AlertCircle,
  Database,
  Shield,
  ShoppingCart,
  Search,
  Camera,
  Receipt,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Building2,
  Warehouse,
  Truck,
  MapPin,
  ClipboardList,
  BarChart3,
  Settings,
  CreditCard,
  FileCheck,
  QrCode,
  ListChecks,
  UserCheck,
  AlertCircle,
  Database,
  Shield,
  ShoppingCart,
  Search,
  Camera,
  Receipt,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
};

interface NavItemProps {
  item: any;
  pathname: string;
  level?: number;
  onNavigate?: () => void;
}

const NavItem = memo(function NavItem({
  item,
  pathname,
  level = 0,
  onNavigate,
}: NavItemProps) {
  const { can } = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = useMemo(
    () => item.children && item.children.length > 0,
    [item.children]
  );
  const isActive = useMemo(() => item.href === pathname, [item.href, pathname]);
  const Icon = useMemo(
    () => (item.icon ? iconMap[item.icon] : null),
    [item.icon]
  );

  const hasPermission = useMemo(() => {
    if (!item.permission) return true;
    return can(item.permission.action, item.permission.resource);
  }, [item.permission, can]);

  if (!hasPermission) return null;

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary",
            level > 0 && "pl-6"
          )}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-primary/60" />}
            {item.title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
            )}
          />
        </button>
        <div
          className={cn(
            "ml-3 border-l border-border/60 pl-3 transition-all",
            isOpen ? "space-y-1" : "hidden"
          )}
        >
          {item.children.map((child: any, idx: number) => (
            <NavItem
              key={idx}
              item={child}
              pathname={pathname}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!item.href) return null;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        level > 0 && "pl-6",
        isActive
          ? "bg-primary/10 text-primary shadow-sm"
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
      )}
    >
      <span className="flex items-center gap-2">
        <ChevronRight className="h-3.5 w-3.5 text-primary/40" />
        {item.title}
      </span>
      {item.badge && <Badge variant="outline">{item.badge}</Badge>}
    </Link>
  );
});

NavItem.displayName = "NavItem";

export const Sidebar = memo(function Sidebar() {
  const { session } = useAuth();
  const pathname = usePathname();
  const navigation = useMemo(
    () => (session?.user ? getNavigationForRole(session.user.role) : []),
    [session?.user?.role]
  );

  const roleTitle = useMemo(() => {
    if (!session?.user) return "";
    const roleMap: Record<string, string> = {
      super_admin: "Logistics Admin",
      partner_admin: "Partner Admin",
      branch_admin: "Branch Admin",
      warehouse_admin: "Warehouse Admin",
      dispatcher: "Dispatcher",
      rider: "Rider",
      customer: "Customer Portal",
    };
    return roleMap[session.user.role] || "Portal";
  }, [session?.user?.role]);

  if (!session) return null;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/60 bg-card/95 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-5 py-5 border-b">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-brand">
          <span className="text-lg font-bold">BG</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">BlackGrapes</p>
          <p className="text-xs text-muted-foreground">{roleTitle}</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-4 px-3 pb-24">
          {navigation.map((item: any, idx: number) => (
            <NavItem key={idx} item={item} pathname={pathname} />
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto px-4 pb-5">
        <div className="rounded-xl bg-primary/10 p-4 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Quick Actions
              </p>
              <p className="text-xs text-muted-foreground">
                Accelerate daily operations with intelligent automations.
              </p>
            </div>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="justify-start bg-primary text-primary-foreground shadow-brand hover:bg-primary/90"
            >
              Schedule Pickup
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              Generate Report
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-4 w-full justify-start gap-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  );
});
