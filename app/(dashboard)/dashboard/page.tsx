"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  Users,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Shield,
  MapPin,
  DollarSign,
  Activity,
  Warehouse,
  ClipboardList,
  UserCheck,
  Receipt,
  Settings,
  Eye,
  Plus,
  Edit,
  Trash2,
  Download,
  Search,
} from "lucide-react";
import Link from "next/link";
import { PermissionGate } from "@/components/auth/PermissionGate";

export default function DashboardPage() {
  const { session } = useAuth();
  const { can, allowedActions, hasAnyPermission } = usePermissions();

  // Role-specific metrics
  const getRoleMetrics = () => {
    const role = session?.user.role;

    if (role === "super_admin") {
      return {
        totalOrders: 1247,
        pendingOrders: 23,
        inTransit: 45,
        delivered: 1179,
        totalBranches: 12,
        activeRiders: 48,
        totalCustomers: 342,
        totalPartners: 5,
        revenue: 2450000,
        gstPending: 8,
      };
    } else if (role === "partner_admin") {
      return {
        totalOrders: 456,
        pendingOrders: 12,
        inTransit: 18,
        delivered: 426,
        totalBranches: 4,
        activeRiders: 15,
        totalCustomers: 128,
        revenue: 890000,
        settlementPending: 2,
      };
    } else if (role === "branch_admin") {
      return {
        totalOrders: 89,
        pendingOrders: 5,
        inTransit: 12,
        delivered: 72,
        activeRiders: 6,
        totalCustomers: 45,
        drsPending: 3,
        todayDeliveries: 15,
      };
    } else if (role === "warehouse_admin") {
      return {
        totalInventory: 1245,
        pendingInward: 12,
        pendingOutward: 8,
        manifestCreated: 23,
        stockAlerts: 3,
        reconciledToday: 45,
      };
    } else if (role === "dispatcher") {
      return {
        pendingAssignments: 15,
        assignedToday: 32,
        inTransit: 18,
        activeRiders: 6,
        drsCreated: 5,
        unassignedOrders: 8,
      };
    } else if (role === "rider") {
      return {
        myTasks: 8,
        completedToday: 12,
        pendingDelivery: 5,
        inTransit: 3,
        totalDeliveries: 234,
        rating: 4.8,
      };
    } else {
      // customer
      return {
        myOrders: 12,
        pendingOrders: 3,
        inTransit: 2,
        delivered: 7,
        totalSpent: 12500,
      };
    }
  };

  const metrics = getRoleMetrics();

  // Get role-specific content sections
  const getRoleSections = () => {
    const role = session?.user.role;
    const sections: React.ReactNode[] = [];

    // SUPER ADMIN SECTIONS
    if (role === "super_admin") {
      sections.push(
        <Card key="partners" className="col-span-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Partner Overview</CardTitle>
                <CardDescription>Multi-partner operations dashboard</CardDescription>
              </div>
              {can("view", "partner") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/partners">
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Partners</p>
                  <p className="text-2xl font-bold">{(metrics as any).totalPartners || 0}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Active Branches</p>
                  <p className="text-2xl font-bold">{metrics.totalBranches}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{((metrics.revenue || 0) / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      );

      if (can("view", "gst")) {
        sections.push(
          <Card key="gst">
            <CardHeader>
              <CardTitle>GST Compliance</CardTitle>
              <CardDescription>Tax filing and compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Filings</span>
                  <Badge variant="destructive">{(metrics as any).gstPending || 0}</Badge>
                </div>
                {can("view", "gst") && (
                  <Button asChild variant="outline" size="sm" className="w-full mt-4">
                    <Link href="/dashboard/gst/reports">
                      <FileText className="mr-2 h-4 w-4" />
                      View GST Reports
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    // PARTNER ADMIN SECTIONS
    if (role === "partner_admin") {
      sections.push(
        <Card key="branch-performance">
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
            <CardDescription>Your branch network overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Branches</span>
                <span className="text-2xl font-bold">{metrics.totalBranches}</span>
              </div>
              {can("view", "branch") && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/branches/performance">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Performance
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );

      if (can("view", "invoice")) {
        sections.push(
          <Card key="settlement">
            <CardHeader>
              <CardTitle>Settlement Status</CardTitle>
              <CardDescription>Payment and settlement overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Settlements</span>
                  <Badge variant="secondary">{(metrics as any).settlementPending || 0}</Badge>
                </div>
                {can("view", "invoice") && (
                  <Button asChild variant="outline" size="sm" className="w-full mt-4">
                    <Link href="/dashboard/invoices">
                      <Receipt className="mr-2 h-4 w-4" />
                      View Invoices
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    // BRANCH ADMIN SECTIONS
    if (role === "branch_admin") {
      sections.push(
        <Card key="drs-status">
          <CardHeader>
            <CardTitle>DRS Status</CardTitle>
            <CardDescription>Delivery Run Sheet management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending DRS</span>
                <Badge variant="secondary">{(metrics as any).drsPending || 0}</Badge>
              </div>
              {can("create", "drs") && (
                <Button asChild variant="default" size="sm" className="w-full">
                  <Link href="/dashboard/drs/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create DRS
                  </Link>
                </Button>
              )}
              {can("view", "drs") && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/drs/active">
                    <Eye className="mr-2 h-4 w-4" />
                    View Active DRS
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );

      if (can("view", "rider")) {
        sections.push(
          <Card key="rider-allocation">
            <CardHeader>
              <CardTitle>Rider Management</CardTitle>
              <CardDescription>Allocate and manage riders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Riders</span>
                  <span className="text-2xl font-bold">{metrics.activeRiders}</span>
                </div>
                {can("allocate", "rider") && (
                  <Button asChild variant="outline" size="sm" className="w-full mt-4">
                    <Link href="/dashboard/riders/allocation">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Allocate Riders
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    // WAREHOUSE ADMIN SECTIONS
    if (role === "warehouse_admin") {
      sections.push(
        <Card key="inventory" className="col-span-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>Warehouse stock and manifest status</CardDescription>
              </div>
              {can("view", "warehouse") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/warehouse/inventory">
                    <Eye className="mr-2 h-4 w-4" />
                    View Inventory
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inventory</p>
                  <p className="text-2xl font-bold">{(metrics as any).totalInventory || 0}</p>
                </div>
                <Warehouse className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Inward</p>
                  <p className="text-2xl font-bold">{(metrics as any).pendingInward || 0}</p>
                </div>
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Outward</p>
                  <p className="text-2xl font-bold">{(metrics as any).pendingOutward || 0}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      );

      if (can("create", "manifest")) {
        sections.push(
          <Card key="manifest-actions">
            <CardHeader>
              <CardTitle>Manifest Actions</CardTitle>
              <CardDescription>Quick manifest operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {can("view", "manifest") && (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/dashboard/manifest/counter/inward">
                      <Package className="mr-2 h-4 w-4" />
                      Counter Inward
                    </Link>
                  </Button>
                )}
                {can("create", "manifest") && (
                  <Button asChild variant="default" size="sm" className="w-full">
                    <Link href="/dashboard/manifest/forwarding/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Forwarding Manifest
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    // DISPATCHER SECTIONS
    if (role === "dispatcher") {
      sections.push(
        <Card key="assignment-queue" className="col-span-full">
          <CardHeader>
            <CardTitle>Assignment Queue</CardTitle>
            <CardDescription>Orders waiting for rider assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Unassigned Orders</p>
                  <p className="text-2xl font-bold">{(metrics as any).unassignedOrders || 0}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Today</p>
                  <p className="text-2xl font-bold">{(metrics as any).assignedToday || 0}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Active Riders</p>
                  <p className="text-2xl font-bold">{metrics.activeRiders}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {can("view", "order") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/orders">
                    <Search className="mr-2 h-4 w-4" />
                    View Orders
                  </Link>
                </Button>
              )}
              {can("create", "drs") && (
                <Button asChild variant="default" size="sm">
                  <Link href="/dashboard/drs/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create DRS
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    // RIDER SECTIONS
    if (role === "rider") {
      sections.push(
        <Card key="my-tasks" className="col-span-full">
          <CardHeader>
            <CardTitle>My Delivery Tasks</CardTitle>
            <CardDescription>Your assigned deliveries for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">My Tasks</p>
                  <p className="text-2xl font-bold">{metrics.myTasks}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold">{(metrics as any).completedToday || 0}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">My Rating</p>
                  <p className="text-2xl font-bold">{metrics.rating}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {can("view", "pod") && (
                <Button asChild variant="default" size="sm">
                  <Link href="/dashboard/rider/tasks">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    View My Tasks
                  </Link>
                </Button>
              )}
              {can("capture", "pod") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/rider/pod">
                    <FileText className="mr-2 h-4 w-4" />
                    Capture POD
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    // CUSTOMER SECTIONS
    if (role === "customer") {
      sections.push(
        <Card key="my-orders" className="col-span-full">
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>Track and manage your shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{metrics.myOrders}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{metrics.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-2xl font-bold">{metrics.inTransit}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold">{metrics.delivered}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {can("create", "booking") && (
                <Button asChild variant="default" size="sm">
                  <Link href="/dashboard/customer/booking">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Booking
                  </Link>
                </Button>
              )}
              {can("view", "order") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/customer/orders">
                    <Eye className="mr-2 h-4 w-4" />
                    View All Orders
                  </Link>
                </Button>
              )}
              {can("track", "tracking") && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/tracking">
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Order
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    return sections;
  };

  // Get role-specific title and description
  const getRoleContent = () => {
    const role = session?.user.role;

    if (role === "super_admin") {
      return {
        title: "Enterprise Command Center",
        subtitle: "Delivery Management System",
        description: "End-to-end logistics intelligence with GST compliance, multi-partner operations, and real-time tracking.",
      };
    } else if (role === "partner_admin") {
      return {
        title: "Partner Dashboard",
        subtitle: "Regional Operations",
        description: "Manage your partner network, branches, and operations with comprehensive analytics.",
      };
    } else if (role === "branch_admin") {
      return {
        title: "Branch Operations",
        subtitle: "Daily Operations Management",
        description: "Manage branch orders, riders, DRS creation, and delivery operations.",
      };
    } else if (role === "warehouse_admin") {
      return {
        title: "Warehouse Operations",
        subtitle: "Inventory & Manifest Management",
        description: "Manage inventory, manifests, stock reconciliation, and warehouse operations.",
      };
    } else if (role === "dispatcher") {
      return {
        title: "Dispatcher Dashboard",
        subtitle: "Order Assignment & Coordination",
        description: "Assign orders to riders, create DRS, and coordinate deliveries efficiently.",
      };
    } else if (role === "rider") {
      return {
        title: "Rider Dashboard",
        subtitle: "My Delivery Tasks",
        description: "View and manage your assigned delivery tasks, capture POD, and track performance.",
      };
    } else {
      return {
        title: "Customer Portal",
        subtitle: "Shipment Management",
        description: "Track your orders, create bookings, and manage shipments.",
      };
    }
  };

  const roleContent = getRoleContent();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{roleContent.title}</h1>
        <p className="text-muted-foreground">
          {roleContent.subtitle} · {roleContent.description}
        </p>
        {session?.isImpersonating && (
          <Badge variant="destructive" className="mt-2">
            You are impersonating this user
          </Badge>
        )}
      </div>

      {/* Role-specific Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Common metrics - shown based on permissions */}
        <PermissionGate action="view" resource="order">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalOrders || metrics.myOrders || 0}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </PermissionGate>

        <PermissionGate action="view" resource="order">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.inTransit || 0}</div>
              <p className="text-xs text-muted-foreground">Active deliveries</p>
            </CardContent>
          </Card>
        </PermissionGate>

        <PermissionGate action="view" resource="branch">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Branches</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalBranches || 0}</div>
              <p className="text-xs text-muted-foreground">Active branches</p>
            </CardContent>
          </Card>
        </PermissionGate>

        <PermissionGate action="view" resource="rider">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeRiders || 0}</div>
              <p className="text-xs text-muted-foreground">On duty today</p>
            </CardContent>
          </Card>
        </PermissionGate>

        {/* Role-specific additional metrics */}
        {session?.user.role === "warehouse_admin" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                <Warehouse className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(metrics as any).totalInventory || 0}</div>
                <p className="text-xs text-muted-foreground">Items in stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(metrics as any).stockAlerts || 0}</div>
                <p className="text-xs text-muted-foreground">Low stock items</p>
              </CardContent>
            </Card>
          </>
        )}

        {session?.user.role === "rider" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(metrics as any).myTasks || 0}</div>
                <p className="text-xs text-muted-foreground">Assigned today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(metrics as any).rating || 0}</div>
                <p className="text-xs text-muted-foreground">Customer rating</p>
              </CardContent>
            </Card>
          </>
        )}

        {session?.user.role === "customer" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{((metrics as any).totalSpent || 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Role-specific content sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Status Card - shown if user can view orders */}
        <PermissionGate action="view" resource="order">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Current order distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>Pending</span>
                  </div>
                  <span className="font-semibold">{metrics.pendingOrders || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span>In Transit</span>
                  </div>
                  <span className="font-semibold">{metrics.inTransit || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Delivered</span>
                  </div>
                  <span className="font-semibold">{metrics.delivered || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </PermissionGate>

        {/* Quick Actions Card - permission-based */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Streamline daily operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {can("create", "booking") && (
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/dashboard/booking/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Booking
                  </Link>
                </Button>
              )}
              {can("view", "order") && (
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/dashboard/orders">
                    <Eye className="mr-2 h-4 w-4" />
                    View Orders
                  </Link>
                </Button>
              )}
              {can("view", "tracking") && (
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/dashboard/tracking">
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Order
                  </Link>
                </Button>
              )}
              {can("view", "report") && (
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/dashboard/reports">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
              )}
              {can("view", "system_settings") && (
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/dashboard/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Role-specific sections */}
        {getRoleSections()}
      </div>
    </div>
  );
}
