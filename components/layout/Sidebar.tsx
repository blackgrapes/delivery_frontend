// Sidebar.tsx - Fixed with consistent useEffect dependencies
"use client";

import { useState, useMemo, memo, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { getNavigationForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LogOut, Sparkles, X } from "lucide-react";
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

const QUICK_ACTIONS_KEY = "quickActionsHidden";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = memo(function Sidebar({ onClose }: SidebarProps) {
  const { session } = useAuth();
  const pathname = usePathname();
  // State to manage visibility of the Quick Actions card
  const [isQuickActionsHidden, setIsQuickActionsHidden] = useState(false);

  const navigation = useMemo(
    () => (session?.user ? getNavigationForRole(session.user.role) : []),
    [session?.user?.role]
  );

  // Load hidden state from sessionStorage - fixed with proper dependencies
  useEffect(() => {
    if (session?.user?.id && typeof window !== "undefined") {
      // Use sessionStorage instead of localStorage
      const isHidden =
        sessionStorage.getItem(`${QUICK_ACTIONS_KEY}_${session.user.id}`) ===
        "true";
      setIsQuickActionsHidden(isHidden);
    } else {
      // If no session, default to showing the card
      setIsQuickActionsHidden(false);
    }
  }, [session?.user?.id]); // Added proper dependency

  const handleHideQuickActions = useCallback(() => {
    setIsQuickActionsHidden(true);
    // Persist the choice in sessionStorage (cleared when browser closes)
    if (session?.user?.id && typeof window !== "undefined") {
      sessionStorage.setItem(`${QUICK_ACTIONS_KEY}_${session.user.id}`, "true");
    }
  }, [session?.user?.id]);

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
    <aside className="flex h-screen w-64 flex-col border-r border-border/60 bg-card/95 backdrop-blur-xl overflow-hidden">
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border/60 lg:hidden flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-brand">
            <span className="text-lg font-bold">BG</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">BlackGrapes</p>
            <p className="text-xs text-muted-foreground">{roleTitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center gap-3 px-5 py-5 border-b border-border/60 flex-shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-brand">
          <span className="text-lg font-bold">BG</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">BlackGrapes</p>
          <p className="text-xs text-muted-foreground">{roleTitle}</p>
        </div>
      </div>

      {/* Scrollable Navigation Area (Takes remaining height) */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <ScrollArea className="flex-1">
          <nav className="space-y-4 px-3 py-4">
            {navigation.map((item: any, idx: number) => (
              <NavItem
                key={idx}
                item={item}
                pathname={pathname}
                onNavigate={onClose}
              />
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Fixed Bottom Section */}
      <div className="border-t border-border/60 px-4 py-5 flex-shrink-0">
        {!isQuickActionsHidden && (
          <div className="rounded-lg bg-primary/10 p-3 shadow-card transition-all duration-300 mb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Quick Actions
                </p>
                <p className="text-[0.7rem] text-muted-foreground leading-snug">
                  Accelerate daily operations.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  onClick={handleHideQuickActions}
                  aria-label="Hide quick actions"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <Button
                variant="secondary"
                size="xs" // Smaller size class
                className="h-7 text-xs justify-start bg-primary text-primary-foreground shadow-brand hover:bg-primary/90"
              >
                Schedule Pickup
              </Button>
              <Button
                variant="outline"
                size="xs" // Smaller size class
                className="h-7 text-xs justify-start"
              >
                Generate Report
              </Button>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-white hover:bg-destructive/10 hover:text-destructive bg-primary"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  );
});
