import type { NavigationItem, Resource, Action, UserRole } from "@/types";
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

export function getNavigationForRole(role: UserRole): NavigationItem[] {
  const baseNav: NavigationItem[] = [];

  switch (role) {
    case "super_admin":
      return getSuperAdminNavigation();
    case "partner_admin":
      return getPartnerAdminNavigation();
    case "branch_admin":
      return getBranchAdminNavigation();
    case "warehouse_admin":
      return getWarehouseAdminNavigation();
    case "dispatcher":
      return getDispatcherNavigation();
    case "rider":
      return getRiderNavigation();
    case "customer":
      return getCustomerNavigation();
    default:
      return baseNav;
  }
}

function getSuperAdminNavigation(): NavigationItem[] {
  return [
    {
      title: "Dashboards",
      icon: "LayoutDashboard",
      children: [
        { title: "Main Dashboard", href: "/dashboard" },
        { title: "Operations Dashboard", href: "/dashboard/operations" },
        { title: "Partner Performance", href: "/dashboard/partner-performance" },
        { title: "Financial Overview", href: "/dashboard/financial" },
        { title: "GST Compliance", href: "/dashboard/gst-compliance" },
      ],
    },
    {
      title: "Booking & Orders",
      icon: "Package",
      children: [
        { title: "Create Booking", href: "/dashboard/booking/create" },
        { title: "Order Management", href: "/dashboard/orders" },
        { title: "All Orders", href: "/dashboard/orders/all" },
        { title: "Pending Pickups", href: "/dashboard/orders/pending-pickups" },
        { title: "In Transit", href: "/dashboard/orders/in-transit" },
        { title: "Out for Delivery", href: "/dashboard/orders/out-for-delivery" },
        { title: "Delivered", href: "/dashboard/orders/delivered" },
        { title: "Exceptions", href: "/dashboard/orders/exceptions" },
        { title: "Quick Booking", href: "/dashboard/booking/quick" },
        { title: "Bulk Booking", href: "/dashboard/booking/bulk" },
      ],
    },
    {
      title: "AWB Management",
      icon: "FileText",
      children: [
        { title: "AWB Series", href: "/dashboard/awb/series" },
        { title: "Allocation", href: "/dashboard/awb/allocation" },
        { title: "Usage Report", href: "/dashboard/awb/usage" },
      ],
    },
    {
      title: "Tracking & POD",
      icon: "Search",
      children: [
        { title: "Live Tracking", href: "/dashboard/tracking" },
        { title: "POD Capture", href: "/dashboard/pod/capture" },
        { title: "POD Verification", href: "/dashboard/pod/verification" },
        { title: "Missing POD", href: "/dashboard/pod/missing" },
        { title: "Digital Signatures", href: "/dashboard/pod/signatures" },
      ],
    },
    {
      title: "Delivery Run Sheet",
      icon: "ClipboardList",
      children: [
        { title: "Create DRS", href: "/dashboard/drs/create" },
        { title: "Active DRS", href: "/dashboard/drs/active" },
        { title: "DRS History", href: "/dashboard/drs/history" },
        { title: "Customer Tracking Portal", href: "/dashboard/tracking/portal" },
      ],
    },
    {
      title: "Manifest Management",
      icon: "FileCheck",
      children: [
        {
          title: "Counter Manifest",
          children: [
            { title: "Inward Processing", href: "/dashboard/manifest/counter/inward" },
            { title: "Bulk Inward", href: "/dashboard/manifest/counter/bulk" },
            { title: "Weight Updates", href: "/dashboard/manifest/counter/weight" },
          ],
        },
        {
          title: "Forwarding Manifest",
          children: [
            { title: "Create Manifest", href: "/dashboard/manifest/forwarding/create" },
            { title: "Bag Tag Management", href: "/dashboard/manifest/bag-tags" },
            { title: "Dispatch Console", href: "/dashboard/manifest/dispatch" },
            { title: "Manifest History", href: "/dashboard/manifest/history" },
          ],
        },
      ],
    },
    {
      title: "Branch Management",
      icon: "Building2",
      children: [
        { title: "All Branches", href: "/dashboard/branches" },
        { title: "Add Branch", href: "/dashboard/branches/add" },
        { title: "Branch Performance", href: "/dashboard/branches/performance" },
        { title: "Service Areas", href: "/dashboard/branches/service-areas" },
      ],
    },
    {
      title: "Warehouse Operations",
      icon: "Warehouse",
      children: [
        { title: "Inventory Management", href: "/dashboard/warehouse/inventory" },
        { title: "Stock Reconciliation", href: "/dashboard/warehouse/reconciliation" },
        { title: "Asset Tracking", href: "/dashboard/warehouse/assets" },
      ],
    },
    {
      title: "Partner Management",
      icon: "Users",
      children: [
        { title: "All Partners", href: "/dashboard/partners" },
        { title: "Partner Onboarding", href: "/dashboard/partners/onboarding" },
        { title: "Performance Scorecards", href: "/dashboard/partners/scorecards" },
        { title: "Settlement Dashboard", href: "/dashboard/partners/settlement" },
      ],
    },
    {
      title: "Vendor Management",
      icon: "Truck",
      children: [
        { title: "Co-loading Partners", href: "/dashboard/vendors/co-loading" },
        { title: "Service Partners", href: "/dashboard/vendors/service" },
        { title: "Performance Metrics", href: "/dashboard/vendors/metrics" },
      ],
    },
    {
      title: "Customer Management",
      icon: "ShoppingCart",
      children: [
        { title: "Customer Directory", href: "/dashboard/customers" },
        { title: "Customer Onboarding", href: "/dashboard/customers/onboarding" },
        { title: "Service Agreements", href: "/dashboard/customers/agreements" },
        { title: "Support Tickets", href: "/dashboard/customers/tickets" },
        { title: "Pickup Requests", href: "/dashboard/customers/pickup-requests" },
      ],
    },
    {
      title: "Financial & GST",
      icon: "CreditCard",
      children: [
        {
          title: "Invoicing",
          children: [
            { title: "Generate Invoice", href: "/dashboard/invoice/generate" },
            { title: "Invoice History", href: "/dashboard/invoice/history" },
            { title: "Credit/Debit Notes", href: "/dashboard/invoice/notes" },
          ],
        },
        {
          title: "GST Compliance",
          children: [
            { title: "GSTR Reports", href: "/dashboard/gst/reports" },
            { title: "E-Way Bills", href: "/dashboard/gst/eway-bills" },
            { title: "Tax Calculations", href: "/dashboard/gst/calculations" },
          ],
        },
        {
          title: "Billing & Payments",
          children: [
            { title: "Payment Collection", href: "/dashboard/payments/collection" },
            { title: "COD Management", href: "/dashboard/payments/cod" },
            { title: "Settlement Reports", href: "/dashboard/payments/settlement" },
            { title: "Tally Integration", href: "/dashboard/payments/tally" },
          ],
        },
      ],
    },
    {
      title: "Operations",
      icon: "Settings",
      children: [
        {
          title: "Rider Management",
          children: [
            { title: "Rider Allocation", href: "/dashboard/riders/allocation" },
            { title: "Performance Tracking", href: "/dashboard/riders/performance" },
            { title: "Attendance & Shifts", href: "/dashboard/riders/attendance" },
          ],
        },
        {
          title: "Exception Handling",
          children: [
            { title: "Pending Exceptions", href: "/dashboard/exceptions/pending" },
            { title: "Exception Workflow", href: "/dashboard/exceptions/workflow" },
            { title: "Root Cause Analysis", href: "/dashboard/exceptions/analysis" },
            { title: "Quality Control", href: "/dashboard/exceptions/quality" },
          ],
        },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: "BarChart3",
      children: [
        {
          title: "Operational Reports",
          children: [
            { title: "Delivery Performance", href: "/dashboard/reports/delivery" },
            { title: "Partner Performance", href: "/dashboard/reports/partner" },
            { title: "Branch Performance", href: "/dashboard/reports/branch" },
            { title: "Rider Performance", href: "/dashboard/reports/rider" },
          ],
        },
        {
          title: "Financial Reports",
          children: [
            { title: "Revenue Reports", href: "/dashboard/reports/revenue" },
            { title: "GST Compliance", href: "/dashboard/reports/gst" },
            { title: "Settlement Reports", href: "/dashboard/reports/settlement" },
            { title: "Business Intelligence", href: "/dashboard/reports/bi" },
          ],
        },
      ],
    },
    {
      title: "Master Data",
      icon: "Database",
      children: [
        { title: "Customer Master", href: "/dashboard/master/customers" },
        { title: "Location Master", href: "/dashboard/master/locations" },
        { title: "Pincode Serviceability", href: "/dashboard/master/pincodes" },
        { title: "Product & Services", href: "/dashboard/master/products" },
        { title: "System Configuration", href: "/dashboard/master/config" },
      ],
    },
    {
      title: "System Admin",
      icon: "Shield",
      children: [
        { title: "User Management", href: "/dashboard/users" },
        { title: "User Roles", href: "/dashboard/admin/roles" },
        { title: "Permissions", href: "/dashboard/admin/permissions" },
        { title: "Audit Logs", href: "/dashboard/admin/audit-logs" },
        { title: "System Settings", href: "/dashboard/admin/settings" },
        { title: "Integration Management", href: "/dashboard/admin/integrations" },
      ],
    },
  ];
}

function getPartnerAdminNavigation(): NavigationItem[] {
  return [
    { title: "Main Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    {
      title: "Booking & Orders",
      icon: "Package",
      children: [
        { title: "Create Booking", href: "/dashboard/booking/create" },
        { title: "All Orders", href: "/dashboard/orders" },
        { title: "Pending Pickups", href: "/dashboard/orders/pending-pickups" },
        { title: "In Transit", href: "/dashboard/orders/in-transit" },
        { title: "Delivered", href: "/dashboard/orders/delivered" },
        { title: "Exceptions", href: "/dashboard/orders/exceptions" },
      ],
    },
    {
      title: "Tracking & POD",
      icon: "Search",
      children: [
        { title: "Live Tracking", href: "/dashboard/tracking" },
        { title: "POD Capture", href: "/dashboard/pod/capture" },
        { title: "POD Verification", href: "/dashboard/pod/verification" },
      ],
    },
    {
      title: "Branch Management",
      icon: "Building2",
      children: [
        { title: "All Branches", href: "/dashboard/branches" },
        { title: "Add Branch", href: "/dashboard/branches/add" },
        { title: "Branch Performance", href: "/dashboard/branches/performance" },
      ],
    },
    {
      title: "Financial & GST",
      icon: "CreditCard",
      children: [
        { title: "Generate Invoice", href: "/dashboard/invoice/generate" },
        { title: "Invoice History", href: "/dashboard/invoice/history" },
        { title: "GSTR Reports", href: "/dashboard/gst/reports" },
        { title: "Settlement Reports", href: "/dashboard/payments/settlement" },
      ],
    },
    {
      title: "Reports",
      icon: "BarChart3",
      children: [
        { title: "Delivery Performance", href: "/dashboard/reports/delivery" },
        { title: "Branch Performance", href: "/dashboard/reports/branch" },
        { title: "Financial Reports", href: "/dashboard/reports/revenue" },
      ],
    },
  ];
}

function getBranchAdminNavigation(): NavigationItem[] {
  return [
    { title: "Main Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    {
      title: "Booking & Orders",
      icon: "Package",
      children: [
        { title: "Create Booking", href: "/dashboard/booking/create" },
        { title: "All Orders", href: "/dashboard/orders" },
        { title: "Pending Pickups", href: "/dashboard/orders/pending-pickups" },
        { title: "In Transit", href: "/dashboard/orders/in-transit" },
        { title: "Out for Delivery", href: "/dashboard/orders/out-for-delivery" },
        { title: "Delivered", href: "/dashboard/orders/delivered" },
      ],
    },
    {
      title: "Delivery Run Sheet",
      icon: "ClipboardList",
      children: [
        { title: "Create DRS", href: "/dashboard/drs/create" },
        { title: "Active DRS", href: "/dashboard/drs/active" },
        { title: "DRS History", href: "/dashboard/drs/history" },
      ],
    },
    {
      title: "Tracking & POD",
      icon: "Search",
      children: [
        { title: "Live Tracking", href: "/dashboard/tracking" },
        { title: "POD Capture", href: "/dashboard/pod/capture" },
      ],
    },
    {
      title: "Rider Management",
      icon: "Truck",
      children: [
        { title: "Rider Allocation", href: "/dashboard/riders/allocation" },
        { title: "Performance Tracking", href: "/dashboard/riders/performance" },
      ],
    },
    {
      title: "Reports",
      icon: "BarChart3",
      children: [
        { title: "Delivery Performance", href: "/dashboard/reports/delivery" },
        { title: "Rider Performance", href: "/dashboard/reports/rider" },
      ],
    },
  ];
}

function getWarehouseAdminNavigation(): NavigationItem[] {
  return [
    { title: "Main Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    {
      title: "Manifest Management",
      icon: "FileCheck",
      children: [
        { title: "Inward Processing", href: "/dashboard/manifest/counter/inward" },
        { title: "Bulk Inward", href: "/dashboard/manifest/counter/bulk" },
        { title: "Create Manifest", href: "/dashboard/manifest/forwarding/create" },
        { title: "Manifest History", href: "/dashboard/manifest/history" },
      ],
    },
    {
      title: "Warehouse Operations",
      icon: "Warehouse",
      children: [
        { title: "Inventory Management", href: "/dashboard/warehouse/inventory" },
        { title: "Stock Reconciliation", href: "/dashboard/warehouse/reconciliation" },
        { title: "Weight Updates", href: "/dashboard/manifest/counter/weight" },
      ],
    },
  ];
}

function getDispatcherNavigation(): NavigationItem[] {
  return [
    { title: "Main Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    {
      title: "Order Management",
      icon: "Package",
      children: [
        { title: "All Orders", href: "/dashboard/orders" },
        { title: "Pending Pickups", href: "/dashboard/orders/pending-pickups" },
        { title: "In Transit", href: "/dashboard/orders/in-transit" },
        { title: "Out for Delivery", href: "/dashboard/orders/out-for-delivery" },
      ],
    },
    {
      title: "Delivery Run Sheet",
      icon: "ClipboardList",
      children: [
        { title: "Create DRS", href: "/dashboard/drs/create" },
        { title: "Active DRS", href: "/dashboard/drs/active" },
      ],
    },
    {
      title: "Rider Management",
      icon: "Truck",
      children: [
        { title: "Rider Allocation", href: "/dashboard/riders/allocation" },
      ],
    },
    {
      title: "Tracking",
      icon: "Search",
      children: [
        { title: "Live Tracking", href: "/dashboard/tracking" },
      ],
    },
  ];
}

function getRiderNavigation(): NavigationItem[] {
  return [
    { title: "My Tasks", href: "/dashboard/rider/tasks", icon: "Package" },
    { title: "Create DRS", href: "/dashboard/rider/drs/create", icon: "ClipboardList" },
    { title: "POD Capture", href: "/dashboard/rider/pod", icon: "Camera" },
    { title: "My Performance", href: "/dashboard/rider/performance", icon: "TrendingUp" },
  ];
}

function getCustomerNavigation(): NavigationItem[] {
  return [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Create Order", href: "/dashboard/customer/booking", icon: "Package" },
    { title: "My Orders", href: "/dashboard/customer/orders", icon: "FileText" },
    { title: "Track Order", href: "/dashboard/tracking", icon: "Search" },
    { title: "Pickup Requests", href: "/dashboard/customer/pickup-requests", icon: "Calendar" },
    { title: "Invoices", href: "/dashboard/customer/invoices", icon: "Receipt" },
  ];
}

