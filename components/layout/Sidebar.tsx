"use client";

import { useState, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { getNavigationForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
}

const NavItem = memo(function NavItem({ item, pathname, level = 0 }: NavItemProps) {
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

  // Check permission if specified
  const hasPermission = useMemo(() => {
    if (!item.permission) return true;
    return can(item.permission.action, item.permission.resource);
  }, [item.permission, can]);

  if (!hasPermission) {
    return null;
  }

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            level > 0 && "pl-6",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span className="flex-1 text-left">{item.title}</span>
          {item.badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l pl-2">
            {item.children.map((child: any, idx: number) => (
              <NavItem key={idx} item={child} pathname={pathname} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!item.href) return null;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        level > 0 && "pl-6",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className="flex-1">{item.title}</span>
      {item.badge && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
          {item.badge}
        </span>
      )}
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
    <div className="flex h-full w-64 flex-col border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-4">
        <h2 className="text-lg font-semibold">{roleTitle}</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-4">
          {navigation.map((item, idx) => (
            <NavItem key={idx} item={item} pathname={pathname} />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
});

Sidebar.displayName = "Sidebar";

