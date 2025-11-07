"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Save } from "lucide-react";

export default function CreateBookingPage() {
  const { can } = usePermissions();
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    weight: "",
    paymentMode: "",
    mode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API
    console.log("Creating booking:", formData);
    alert("Booking created successfully! (Mock)");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Booking</h1>
        <p className="text-muted-foreground">
          Create a new shipment booking
        </p>
      </div>

      <PermissionGate action="create" resource="booking">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Booking Details
            </CardTitle>
            <CardDescription>Enter shipment information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name *</Label>
                  <Input
                    id="senderName"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderPhone">Sender Phone *</Label>
                  <Input
                    id="senderPhone"
                    type="tel"
                    value={formData.senderPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, senderPhone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="senderAddress">Sender Address *</Label>
                  <Input
                    id="senderAddress"
                    value={formData.senderAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, senderAddress: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverName">Receiver Name *</Label>
                  <Input
                    id="receiverName"
                    value={formData.receiverName}
                    onChange={(e) =>
                      setFormData({ ...formData, receiverName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverPhone">Receiver Phone *</Label>
                  <Input
                    id="receiverPhone"
                    type="tel"
                    value={formData.receiverPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, receiverPhone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="receiverAddress">Receiver Address *</Label>
                  <Input
                    id="receiverAddress"
                    value={formData.receiverAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, receiverAddress: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode *</Label>
                  <Select
                    value={formData.mode}
                    onValueChange={(value) =>
                      setFormData({ ...formData, mode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air">Air</SelectItem>
                      <SelectItem value="surface">Surface</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMode">Payment Mode *</Label>
                  <Select
                    value={formData.paymentMode}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="to_pay">To Pay</SelectItem>
                      <SelectItem value="cod">COD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Create Booking
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PermissionGate>
    </div>
  );
}

