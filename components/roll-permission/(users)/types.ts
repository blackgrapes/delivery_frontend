export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  branchName?: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin?: string;
  phone?: string;
}

export type UserRole =
  | "superadmin"
  | "partner"
  | "branch"
  | "dispatcher"
  | "rider"
  | "customer";

export interface CreateUserData {
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  password: string;
  phone?: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
}
