// @/components/booking/create/CreateBooking.tsx
"use client";

import { useState } from "react";
import { Printer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DocumentSearch from "./DocumentSearch";
import PrintView from "./PrintView";
import { BookingFormData, Customer, Receiver, PickupLocation } from "./types";
import { mockCustomers } from "./mockData";

const CreateBooking = () => {
  const [showPrint, setShowPrint] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  const [manualSender, setManualSender] = useState({
    name: "",
    contactPerson: "",
    address1: "",
    city: "",
    station: "",
    pincode: "",
    mobileNo: "",
    gstin: "",
  });

  const [manualReceiver, setManualReceiver] = useState<Receiver>({
    id: "manual-receiver",
    name: "",
    address: "",
    city: "",
    pincode: "",
    mobileNo: "",
    email: "",
  });

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
      documentNo: customer.documentNo,
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

  const handleManualSenderChange = (field: string, value: string) => {
    setManualSender((prev) => ({ ...prev, [field]: value }));

    // Create temporary sender object
    const tempSender: Customer = {
      id: "manual-sender",
      code: "MANUAL",
      documentNo: formData.documentNo || "MANUAL",
      name: field === "name" ? value : manualSender.name,
      contactPerson:
        field === "contactPerson" ? value : manualSender.contactPerson,
      address1: field === "address1" ? value : manualSender.address1,
      address2: "",
      city: field === "city" ? value : manualSender.city,
      station: field === "station" ? value : manualSender.station,
      pincode: field === "pincode" ? value : manualSender.pincode,
      mobileNo: field === "mobileNo" ? value : manualSender.mobileNo,
      phoneO: "",
      phoneR: "",
      email: "",
      hasReceiver: false,
      receivers: [],
      usePickupLocation: false,
      pickupLocations: [],
      status: "active",
      gstin: field === "gstin" ? value : manualSender.gstin,
    };

    setFormData((prev) => ({ ...prev, sender: tempSender }));
  };

  const handleManualReceiverChange = (field: keyof Receiver, value: string) => {
    setManualReceiver((prev) => ({ ...prev, [field]: value }));

    // Update form data with manual receiver
    const updatedReceiver = { ...manualReceiver, [field]: value };
    setFormData((prev) => ({ ...prev, receiver: updatedReceiver }));
  };

  const handlePickupLocationChange = (
    pickupLocation: PickupLocation | null
  ) => {
    setFormData((prev) => ({ ...prev, pickupLocation }));
  };

  const handleReceiverChange = (receiver: Receiver | null) => {
    setFormData((prev) => ({ ...prev, receiver }));
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
    setManualSender({
      name: "",
      contactPerson: "",
      address1: "",
      city: "",
      station: "",
      pincode: "",
      mobileNo: "",
      gstin: "",
    });
    setManualReceiver({
      id: "manual-receiver",
      name: "",
      address: "",
      city: "",
      pincode: "",
      mobileNo: "",
      email: "",
    });
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
      <div className="p-6 space-y-6 print:p-0 print:space-y-0">
        <div className="flex justify-between items-center print:hidden">
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
                Create new shipment bookings quickly
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

      {/* Document Search - Full Width */}
      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-6">
          <DocumentSearch
            onDocumentSelect={handleDocumentSelect}
            customers={mockCustomers}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side - Sender Card (Details + Booking Details) */}
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Sender Details</h2>

            {/* Sender Information */}
            <div className="space-y-4 mb-6">
              {formData.sender ? (
                // Auto-filled sender details
                <div className="space-y-3">
                  {/* Pickup Location Dropdown */}
                  {formData.sender.usePickupLocation &&
                    formData.sender.pickupLocations.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Pickup Location
                        </label>
                        <select
                          value={formData.pickupLocation?.id || ""}
                          onChange={(e) => {
                            const selectedLocation =
                              formData.sender?.pickupLocations.find(
                                (loc) => loc.id === e.target.value
                              ) || null;
                            handlePickupLocationChange(selectedLocation);
                          }}
                          className="w-full p-2 border rounded-lg bg-white"
                        >
                          <option value="">Select Pickup Location</option>
                          {formData.sender.pickupLocations.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name} - {location.address}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input
                        value={formData.sender.name}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Contact Person
                      </label>
                      <input
                        value={formData.sender.contactPerson}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <input
                      value={`${formData.sender.address1}, ${formData.sender.address2}`}
                      readOnly
                      className="w-full p-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium">City</label>
                      <input
                        value={formData.sender.city}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Station</label>
                      <input
                        value={formData.sender.station}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Pincode</label>
                      <input
                        value={formData.sender.pincode}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Mobile No</label>
                      <input
                        value={formData.sender.mobileNo}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">GSTIN</label>
                      <input
                        value={formData.sender.gstin || "N/A"}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Manual sender input
                <div className="space-y-3 p-3 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-sm text-blue-800">
                    Enter Sender Details Manually
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Name *</label>
                      <input
                        value={manualSender.name}
                        onChange={(e) =>
                          handleManualSenderChange("name", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter sender name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Contact Person *
                      </label>
                      <input
                        value={manualSender.contactPerson}
                        onChange={(e) =>
                          handleManualSenderChange(
                            "contactPerson",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter contact person"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address *</label>
                    <input
                      value={manualSender.address1}
                      onChange={(e) =>
                        handleManualSenderChange("address1", e.target.value)
                      }
                      className="w-full p-2 border rounded-lg bg-white"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium">City *</label>
                      <input
                        value={manualSender.city}
                        onChange={(e) =>
                          handleManualSenderChange("city", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Station *</label>
                      <input
                        value={manualSender.station}
                        onChange={(e) =>
                          handleManualSenderChange("station", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter station"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Pincode *</label>
                      <input
                        value={manualSender.pincode}
                        onChange={(e) =>
                          handleManualSenderChange("pincode", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Mobile No *</label>
                      <input
                        value={manualSender.mobileNo}
                        onChange={(e) =>
                          handleManualSenderChange("mobileNo", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">GSTIN</label>
                      <input
                        value={manualSender.gstin}
                        onChange={(e) =>
                          handleManualSenderChange("gstin", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter GSTIN (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sender Booking Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contents</label>
                  <input
                    value={formData.contents}
                    onChange={(e) =>
                      handleFormChange("contents", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="NON DOX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pay Mode</label>
                  <select
                    value={formData.payMode}
                    onChange={(e) =>
                      handleFormChange("payMode", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="">Select</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit</option>
                    <option value="online">Online</option>
                    <option value="cod">COD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Forward To</label>
                  <input
                    value={formData.forwardTo}
                    onChange={(e) =>
                      handleFormChange("forwardTo", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="R-BillToSender"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Thru</label>
                  <input
                    value={formData.thru}
                    onChange={(e) => handleFormChange("thru", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="YELLOWHYDERA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleFormChange("weight", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="1.970"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Charge Wt.</label>
                  <input
                    type="number"
                    value={formData.chargeWeight}
                    onChange={(e) =>
                      handleFormChange("chargeWeight", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="2.000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate</label>
                  <input
                    type="number"
                    value={formData.rate}
                    onChange={(e) => handleFormChange("rate", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="250.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FOV Amt</label>
                  <input
                    type="number"
                    value={formData.fovAmt}
                    onChange={(e) => handleFormChange("fovAmt", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Receiver Card (Details + Booking Details) */}
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Receiver Details</h2>

            {/* Receiver Information */}
            <div className="space-y-4 mb-6">
              {formData.sender &&
              formData.sender.hasReceiver &&
              formData.sender.receivers.length > 0 ? (
                // Auto-filled receiver with dropdown
                <div className="space-y-3">
                  {/* Receiver Selection Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Select Receiver
                    </label>
                    <select
                      value={formData.receiver?.id || ""}
                      onChange={(e) => {
                        const selectedReceiver =
                          formData.sender?.receivers.find(
                            (rec) => rec.id === e.target.value
                          ) || null;
                        handleReceiverChange(selectedReceiver);
                      }}
                      className="w-full p-2 border rounded-lg bg-white"
                    >
                      <option value="">Select Receiver</option>
                      {formData.sender.receivers.map((receiver) => (
                        <option key={receiver.id} value={receiver.id}>
                          {receiver.name} - {receiver.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.receiver && (
                    <div className="space-y-3 p-3 border rounded-lg bg-green-50">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Name</label>
                          <input
                            value={formData.receiver.name}
                            readOnly
                            className="w-full p-2 border rounded-lg bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Mobile No
                          </label>
                          <input
                            value={formData.receiver.mobileNo}
                            readOnly
                            className="w-full p-2 border rounded-lg bg-gray-50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Address</label>
                        <input
                          value={formData.receiver.address}
                          readOnly
                          className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">City</label>
                          <input
                            value={formData.receiver.city}
                            readOnly
                            className="w-full p-2 border rounded-lg bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Pincode</label>
                          <input
                            value={formData.receiver.pincode}
                            readOnly
                            className="w-full p-2 border rounded-lg bg-gray-50"
                          />
                        </div>
                      </div>
                      {formData.receiver.email && (
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <input
                            value={formData.receiver.email}
                            readOnly
                            className="w-full p-2 border rounded-lg bg-gray-50"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Manual receiver input
                <div className="space-y-3 p-3 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-sm text-blue-800">
                    Enter Receiver Details Manually
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Name *</label>
                      <input
                        value={manualReceiver.name}
                        onChange={(e) =>
                          handleManualReceiverChange("name", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter receiver name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mobile No *</label>
                      <input
                        value={manualReceiver.mobileNo}
                        onChange={(e) =>
                          handleManualReceiverChange("mobileNo", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address *</label>
                    <input
                      value={manualReceiver.address}
                      onChange={(e) =>
                        handleManualReceiverChange("address", e.target.value)
                      }
                      className="w-full p-2 border rounded-lg bg-white"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">City *</label>
                      <input
                        value={manualReceiver.city}
                        onChange={(e) =>
                          handleManualReceiverChange("city", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Pincode *</label>
                      <input
                        value={manualReceiver.pincode}
                        onChange={(e) =>
                          handleManualReceiverChange("pincode", e.target.value)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={manualReceiver.email || ""}
                      onChange={(e) =>
                        handleManualReceiverChange("email", e.target.value)
                      }
                      className="w-full p-2 border rounded-lg bg-white"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Receiver Booking Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Charges</label>
                  <input
                    type="number"
                    value={formData.charges}
                    onChange={(e) =>
                      handleFormChange("charges", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="250.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Other Add/Less</label>
                  <input
                    type="number"
                    value={formData.otherAddLess}
                    onChange={(e) =>
                      handleFormChange("otherAddLess", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Net Charges</label>
                  <input
                    type="number"
                    value={formData.netCharges}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-50"
                    placeholder="250.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount</label>
                  <input
                    type="number"
                    value={formData.disc}
                    onChange={(e) => handleFormChange("disc", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fuel %</label>
                  <input
                    type="number"
                    value={formData.fuelPercent}
                    onChange={(e) =>
                      handleFormChange("fuelPercent", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax</label>
                  <input
                    type="number"
                    value={formData.tax}
                    onChange={(e) => handleFormChange("tax", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="45.00"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Net Amount</label>
                  <input
                    type="number"
                    value={formData.netAmount}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-50 font-bold"
                    placeholder="295.00"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Remark</label>
                  <textarea
                    value={formData.remark}
                    onChange={(e) => handleFormChange("remark", e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                    placeholder="Additional remarks..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBooking;
