"use client";

import { useState } from "react";
import UserHeader from "./UserHeader";
import UserStats from "./UserStats";
import UserFilters from "./UserFilters";
import UserList from "./UserList";
import UserForm from "./UserForm";
import { User, CreateUserData } from "./types";
import { users as mockUsers } from "./mockData";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleSaveUser = (formData: CreateUserData) => {
    if (selectedUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                ...formData,
                branchName: formData.branchId
                  ? getBranchName(formData.branchId)
                  : undefined,
              }
            : u
        )
      );
    } else {
      // Add new user
      const newUser: User = {
        id: `USR-${Date.now().toString().slice(-6)}`,
        ...formData,
        branchName: formData.branchId
          ? getBranchName(formData.branchId)
          : undefined,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const getBranchName = (branchId: string) => {
    // This would typically come from your branches data
    return "Mumbai Central Hub"; // Simplified for demo
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <UserHeader onAddUser={handleAddUser} userCount={users.length} />

      <UserStats users={users} />

      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <UserList
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {showForm && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
