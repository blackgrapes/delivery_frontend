"use client";

import { useState } from "react";
import RolesHeader from "./RolesHeader";
import RolesStats from "./RolesStats";
import RolesList from "./RolesList";
import RoleForm from "./RoleForm";
import { Role } from "./types";
import { roles as mockRoles } from "./mockData";

const RolesManagement = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddRole = () => {
    setSelectedRole(null);
    setShowForm(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleSaveRole = (
    formData: Omit<Role, "id" | "createdAt" | "userCount" | "isSystem">
  ) => {
    if (selectedRole) {
      // Update existing role
      setRoles((prev) =>
        prev.map((role) =>
          role.id === selectedRole.id ? { ...role, ...formData } : role
        )
      );
    } else {
      // Add new role
      const newRole: Role = {
        id: `role-${Date.now().toString().slice(-6)}`,
        ...formData,
        userCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
        isSystem: false,
      };
      setRoles((prev) => [...prev, newRole]);
    }
    setShowForm(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  return (
    <div className="space-y-6 p-6">
      <RolesHeader onAddRole={handleAddRole} roleCount={roles.length} />

      <RolesStats roles={roles} />

      <RolesList
        roles={roles}
        onEditRole={handleEditRole}
        onDeleteRole={handleDeleteRole}
      />

      {showForm && (
        <RoleForm
          role={selectedRole}
          onSave={handleSaveRole}
          onCancel={() => {
            setShowForm(false);
            setSelectedRole(null);
          }}
        />
      )}
    </div>
  );
};

export default RolesManagement;
