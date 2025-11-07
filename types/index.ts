// Core Types for Logistics & Delivery Management System

export type UserRole =
  | "super_admin"
  | "partner_admin"
  | "branch_admin"
  | "warehouse_admin"
  | "dispatcher"
  | "rider"
  | "customer";

export type Resource =
  | "branch"
  | "warehouse"
  | "order"
  | "invoice"
  | "partner"
  | "user"
  | "shipment"
  | "manifest"
  | "pod"
  | "customer"
  | "report"
  | "gst"
  | "booking"
  | "awb"
  | "drs"
  | "tracking"
  | "rider"
  | "vendor"
  | "pickup"
  | "exception"
  | "master_data"
  | "system_settings";

export type Action =
  | "view"
  | "manage"
  | "create"
  | "update"
  | "delete"
  | "assign"
  | "impersonate"
  | "approve"
  | "assign_staff"
  | "stock_update"
  | "update_status"
  | "assign_rider"
  | "cancel"
  | "generate"
  | "bulk_operations"
  | "onboard"
  | "assign_roles"
  | "export"
  | "analytics"
  | "filing"
  | "compliance"
  | "reports"
  | "verify"
  | "capture"
  | "allocate"
  | "reconcile"
  | "track"
  | "scan"
  | "bulk_update"
  | "configure";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  assignedBranchIds: string[];
  isActive: boolean;
  createdAt: string;
  phone?: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: "super_admin" | "partner";
  city: string;
  isActive: boolean;
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  tenantId: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export interface RolePermission {
  role: UserRole;
  resources: Record<Resource, Action[]>;
}

export interface Session {
  user: User;
  tenant: Tenant;
  branches: Branch[];
  token: string;
  expiresAt: string;
  impersonatedBy?: string;
  isImpersonating: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, unknown>;
  timestamp: string;
  ipAddress?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  branchId: string;
  status: "pending" | "assigned" | "in_transit" | "delivered" | "cancelled";
  pickupAddress: string;
  deliveryAddress: string;
  createdAt: string;
  assignedRiderId?: string;
}

export interface PermissionCheck {
  can: boolean;
  reason?: string;
}

export interface CustomRole {
  id: string;
  name: string;
  description?: string;
  permissions: Record<Resource, Action[]>;
  isSystem: boolean;
  createdAt: string;
  createdBy: string;
}

export interface NavigationItem {
  title: string;
  href?: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  permission?: {
    resource: Resource;
    action: Action;
  };
}

