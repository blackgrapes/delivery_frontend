"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Edit } from "lucide-react";

export default function CustomerMasterPage() {
  const customers = [
    {
      id: "cust-1",
      name: "ABC Corporation",
      gstin: "27ABCDE1234F1Z5",
      email: "contact@abc.com",
      phone: "+91-9876543210",
      city: "Mumbai",
      status: "active",
    },
    {
      id: "cust-2",
      name: "XYZ Industries",
      gstin: "29XYZAB5678G2H6",
      email: "info@xyz.com",
      phone: "+91-9876543211",
      city: "Delhi",
      status: "active",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Master</h1>
          <p className="text-muted-foreground">
            Manage customer master data
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>
      </div>

      <div className="space-y-4">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {customer.name}
                  </CardTitle>
                  <CardDescription>{customer.city}</CardDescription>
                </div>
                <Badge variant="outline">{customer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">GSTIN</p>
                  <p className="font-medium">{customer.gstin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">City</p>
                  <p className="font-medium">{customer.city}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

