// components/master/customers/CustomerManagement.tsx
"use client";

import { useState } from "react";
import CustomerHeader from "./CustomerHeader";
import CustomerStats from "./CustomerStats";
import CustomerFilters from "./CustomerFilters";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import { Customer, CustomerFormData } from "./types";
import { mockCustomers } from "./mockData";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const handleSaveCustomer = (formData: CustomerFormData) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers(
        customers.map((c) =>
          c.id === selectedCustomer.id ? { ...c, ...formData } : c
        )
      );
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: `CUST-${Date.now()}`,
        code: `CUST${customers.length + 1}`,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCustomers([...customers, newCustomer]);
    }
    setShowForm(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.gstin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <CustomerHeader
        onAddCustomer={handleAddCustomer}
        customerCount={customers.length}
      />

      <CustomerStats customers={customers} />

      <CustomerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <CustomerList
        customers={filteredCustomers}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />

      {showForm && (
        <CustomerForm
          customer={selectedCustomer}
          onSave={handleSaveCustomer}
          onCancel={() => {
            setShowForm(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerManagement;
