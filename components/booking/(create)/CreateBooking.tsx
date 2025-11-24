// @/components/booking/create/CreateBooking.tsx
"use client";

import { useState } from "react";
import { Printer, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DocumentSearch from "./DocumentSearch";
import SenderDetails from "./SenderDetails";
import ReceiverDetails from "./ReceiverDetails";
import BookingDetails from "./BookingDetails";
import PrintView from "./PrintView";
import { BookingFormData, Customer, Receiver, PickupLocation } from "./types";
import { mockCustomers } from "./mockData";

const CreateBooking = () => {
  const [showPrint, setShowPrint] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [formData, setFormData] = useState<BookingFormData>({
    documentNo: "",
    sender: null,
    receiver: null,
    pickupLocation: null,
    contents: "",
    payMode: "",
    forwardTo: "",
    thru: "",
    weight: "",
    chargeWeight: "",
    rate: "",
    fovAmt: "",
    charges: "",
    otherAddLess: "",
    netCharges: "",
    disc: "",
    fuelPercent: "",
    tax: "",
    netAmount: "",
    remark: "",
  });

  const handleDocumentSelect = (customer: Customer) => {
    setFormData((prev) => ({
      ...prev,
      documentNo: customer.documentNo, // Use documentNo instead of code
      sender: customer,
      receiver:
        customer.hasReceiver && customer.receivers.length > 0
          ? customer.receivers[0]
          : null,
      pickupLocation:
        customer.usePickupLocation && customer.pickupLocations.length > 0
          ? customer.pickupLocations[0]
          : null,
    }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSenderChange = (sender: Customer | null) => {
    setFormData((prev) => ({
      ...prev,
      sender,
      receiver:
        sender?.hasReceiver && sender.receivers.length > 0
          ? sender.receivers[0]
          : null,
      pickupLocation:
        sender?.usePickupLocation && sender.pickupLocations.length > 0
          ? sender.pickupLocations[0]
          : null,
    }));
  };

  const handleReceiverChange = (receiver: Receiver | null) => {
    setFormData((prev) => ({ ...prev, receiver }));
  };

  const handlePickupLocationChange = (
    pickupLocation: PickupLocation | null
  ) => {
    setFormData((prev) => ({ ...prev, pickupLocation }));
  };

  const generateBookingNumber = () => {
    return `BK${Date.now().toString().slice(-6)}`;
  };

  const handleCreateBooking = () => {
    const bookingNo = generateBookingNumber();
    setBookingNumber(bookingNo);
    setShowPrint(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    setShowPrint(false);
    setFormData({
      documentNo: "",
      sender: null,
      receiver: null,
      pickupLocation: null,
      contents: "",
      payMode: "",
      forwardTo: "",
      thru: "",
      weight: "",
      chargeWeight: "",
      rate: "",
      fovAmt: "",
      charges: "",
      otherAddLess: "",
      netCharges: "",
      disc: "",
      fuelPercent: "",
      tax: "",
      netAmount: "",
      remark: "",
    });
  };

  if (showPrint) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Booking Print Preview</h1>
          <div className="flex gap-3">
            <Button
              onClick={handlePrint}
              className="gap-2 rounded-xl bg-primary text-primary-foreground"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              onClick={handleNewBooking}
              className="gap-2 rounded-xl bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>
        <PrintView formData={formData} bookingNumber={bookingNumber} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create Booking
              </h1>
              <p className="text-muted-foreground">
                Create new shipment bookings with customer data
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={handleCreateBooking}
          disabled={!formData.sender}
          className="gap-2 rounded-xl bg-primary text-primary-foreground"
        >
          <Printer className="h-4 w-4" />
          Create & Print Booking
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Search */}
          <Card className="rounded-2xl border-border/70">
            <CardContent className="p-6">
              <DocumentSearch
                onDocumentSelect={handleDocumentSelect}
                customers={mockCustomers}
              />
            </CardContent>
          </Card>

          {/* Sender and Receiver */}
          <div className="grid gap-6 md:grid-cols-2">
            <SenderDetails
              sender={formData.sender}
              pickupLocation={formData.pickupLocation}
              onPickupLocationChange={handlePickupLocationChange}
            />
            <ReceiverDetails
              sender={formData.sender}
              receiver={formData.receiver}
              onReceiverChange={handleReceiverChange}
            />
          </div>

          {/* Booking Details */}
          <BookingDetails formData={formData} onFormChange={handleFormChange} />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-border/70">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-lg"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-lg"
                >
                  <Printer className="h-4 w-4" />
                  Print Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="rounded-2xl border-border/70">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document No:</span>
                  <span className="font-mono">
                    {formData.documentNo || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sender:</span>
                  <span>{formData.sender?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receiver:</span>
                  <span>{formData.receiver?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Amount:</span>
                  <span className="font-semibold">
                    ₹{formData.netAmount || "0.00"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
