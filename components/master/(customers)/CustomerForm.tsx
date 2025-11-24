// components/master/customers/CustomerForm.tsx
import { useState, useEffect } from "react";
import {
  X,
  Building,
  Search,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Customer, CustomerFormData, Receiver, PickupLocation } from "./types";

interface CustomerFormProps {
  customer: Customer | null;
  onSave: (data: CustomerFormData) => void;
  onCancel: () => void;
}

interface GstApiResponse {
  taxpayerInfo: {
    lgnm: string;
    tradeNam: string;
    pradr: {
      addr: {
        bno: string;
        st: string;
        loc: string;
        bnm: string;
        city: string;
        stcd: string;
        pncd: string;
      };
    };
    stj: string;
    sts: string;
    ctb: string;
    gstin: string;
  };
  error: boolean;
  message: string;
}

const CustomerForm = ({ customer, onSave, onCancel }: CustomerFormProps) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    contactPerson: "",
    address1: "",
    address2: "",
    city: "",
    station: "",
    pincode: "",
    gstin: "",
    mobileNo: "",
    phoneO: "",
    phoneR: "",
    email: "",
    hasReceiver: false,
    receivers: [],
    usePickupLocation: false,
    pickupLocations: [],
    status: "active",
    fuelCharges: 0,
    fovCharges: 0,
    quotationType: "Standard",
    awt: 0,
    category: "CUSTOMER",
    paymentMode: "Cash",
    accountGroup: "General",
    isInterStateDealer: false,
    documentNo: "",
    bookedBy: "ADMIN",
    bookedDate: new Date().toLocaleString("en-IN"),
    remark: "",
  });

  const [gstSearch, setGstSearch] = useState("");
  const [gstLoading, setGstLoading] = useState(false);
  const [gstData, setGstData] = useState<any>(null);
  const [gstError, setGstError] = useState<string>("");
  const [pincodeSuggestions, setPincodeSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        contactPerson: customer.contactPerson,
        address1: customer.address1,
        address2: customer.address2,
        city: customer.city,
        station: customer.station,
        pincode: customer.pincode,
        gstin: customer.gstin,
        mobileNo: customer.mobileNo,
        phoneO: customer.phoneO,
        phoneR: customer.phoneR,
        email: customer.email,
        hasReceiver: customer.hasReceiver,
        receivers: customer.receivers || [],
        usePickupLocation: customer.usePickupLocation,
        pickupLocations: customer.pickupLocations || [],
        status: customer.status,
        fuelCharges: customer.fuelCharges,
        fovCharges: customer.fovCharges,
        quotationType: customer.quotationType,
        awt: customer.awt,
        category: customer.category,
        paymentMode: customer.paymentMode,
        accountGroup: customer.accountGroup,
        isInterStateDealer: customer.isInterStateDealer,
        documentNo: customer.documentNo,
        bookedBy: customer.bookedBy,
        bookedDate: customer.bookedDate,
        remark: customer.remark,
      });
      if (customer.gstin) {
        setGstSearch(customer.gstin);
      }
    }
  }, [customer]);

  const handleGstSearch = async () => {
    if (!gstSearch.trim()) return;

    setGstLoading(true);
    setGstError("");
    setGstData(null);

    try {
      const response = await fetch(
        `https://appyflow.in/api/verifyGST?gstNo=${gstSearch}&key_secret=vbPkxifWraP8OTLlb1lNF84llxW2`
      );

      const data: GstApiResponse = await response.json();

      if (data.error) {
        setGstError(data.message || "Invalid GSTIN or API error");
        return;
      }

      if (data.taxpayerInfo) {
        const taxpayer = data.taxpayerInfo;
        const address = taxpayer.pradr.addr;

        // Build address lines
        const addressLine1 = [address.bno, address.st]
          .filter(Boolean)
          .join(", ");
        const addressLine2 = [address.loc, address.bnm]
          .filter(Boolean)
          .join(", ");

        setGstData({
          legalName: taxpayer.lgnm,
          tradeName: taxpayer.tradeNam,
          address: addressLine1 + (addressLine2 ? `, ${addressLine2}` : ""),
          city: address.city || "",
          state: address.stcd || "",
          pincode: address.pncd || "",
          status: taxpayer.sts,
          businessType: taxpayer.ctb,
          jurisdiction: taxpayer.stj,
        });

        // Auto-fill form with GST data
        setFormData((prev) => ({
          ...prev,
          name: taxpayer.lgnm || prev.name,
          address1: addressLine1 || prev.address1,
          address2: addressLine2 || prev.address2,
          city: address.city || prev.city,
          station: taxpayer.stj || prev.station,
          pincode: address.pncd || prev.pincode,
          gstin: gstSearch,
        }));
      }
    } catch (error) {
      console.error("GST API error:", error);
      setGstError("Failed to verify GSTIN. Please try again.");
    } finally {
      setGstLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addReceiver = () => {
    const newReceiver: Receiver = {
      id: `rec-${Date.now()}`,
      name: "",
      address: "",
      city: "",
      pincode: "",
      mobileNo: "",
      email: "",
    };
    setFormData((prev) => ({
      ...prev,
      receivers: [...prev.receivers, newReceiver],
    }));
  };

  const updateReceiver = (
    index: number,
    field: keyof Receiver,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      receivers: prev.receivers.map((receiver, i) =>
        i === index ? { ...receiver, [field]: value } : receiver
      ),
    }));
  };

  const removeReceiver = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      receivers: prev.receivers.filter((_, i) => i !== index),
    }));
  };

  const addPickupLocation = () => {
    const newPickupLocation: PickupLocation = {
      id: `pickup-${Date.now()}`,
      name: "",
      address: "",
      city: "",
      pincode: "",
      contactPerson: "",
      mobileNo: "",
    };
    setFormData((prev) => ({
      ...prev,
      pickupLocations: [...prev.pickupLocations, newPickupLocation],
    }));
  };

  const updatePickupLocation = (
    index: number,
    field: keyof PickupLocation,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      pickupLocations: prev.pickupLocations.map((location, i) =>
        i === index ? { ...location, [field]: value } : location
      ),
    }));
  };

  const removePickupLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pickupLocations: prev.pickupLocations.filter((_, i) => i !== index),
    }));
  };

  const handlePincodeInput = (
    pincode: string,
    type: "receiver" | "pickup",
    index: number
  ) => {
    // Simulate pincode suggestions (in real app, this would be an API call)
    if (pincode.length >= 3) {
      setPincodeSuggestions(["500070", "500071", "500072", "302022", "110017"]);
    } else {
      setPincodeSuggestions([]);
    }

    if (type === "receiver") {
      updateReceiver(index, "pincode", pincode);
    } else {
      updatePickupLocation(index, "pincode", pincode);
    }
  };

  const selectPincodeSuggestion = (
    pincode: string,
    type: "receiver" | "pickup",
    index: number
  ) => {
    if (type === "receiver") {
      updateReceiver(index, "pincode", pincode);
    } else {
      updatePickupLocation(index, "pincode", pincode);
    }
    setPincodeSuggestions([]);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border-border/70 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/70">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {customer ? "Edit Customer" : "Add New Customer"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GST Search Section */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/30">
              <Label className="text-sm font-medium mb-3 block">
                GSTIN Lookup
              </Label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Enter GSTIN number"
                    value={gstSearch}
                    onChange={(e) => setGstSearch(e.target.value)}
                    className="pr-20 rounded-lg"
                  />
                  {gstData && (
                    <Badge
                      variant="success"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleGstSearch}
                  disabled={gstLoading || !gstSearch.trim()}
                  className="gap-2 rounded-lg"
                >
                  <Search className="h-4 w-4" />
                  {gstLoading ? "Searching..." : "Search GST"}
                </Button>
              </div>

              {gstError && (
                <div className="mt-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 text-sm text-destructive mb-2">
                    <AlertCircle className="h-4 w-4" />
                    GSTIN Verification Failed
                  </div>
                  <div className="text-xs text-destructive">{gstError}</div>
                </div>
              )}

              {gstData && (
                <div className="mt-3 p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 text-sm text-success mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    GSTIN Verified Successfully
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <strong>Legal Name:</strong> {gstData.legalName}
                    </div>
                    <div>
                      <strong>Trade Name:</strong> {gstData.tradeName}
                    </div>
                    <div>
                      <strong>Business Type:</strong> {gstData.businessType}
                    </div>
                    <div>
                      <strong>Status:</strong> {gstData.status}
                    </div>
                    <div>
                      <strong>State:</strong> {gstData.state}
                    </div>
                    <div>
                      <strong>Jurisdiction:</strong> {gstData.jurisdiction}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Basic Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange("gstin", e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                        <SelectItem value="VENDOR">Vendor</SelectItem>
                        <SelectItem value="PARTNER">Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="mobileNo">Mobile Number *</Label>
                  <Input
                    id="mobileNo"
                    value={formData.mobileNo}
                    onChange={(e) =>
                      handleInputChange("mobileNo", e.target.value)
                    }
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneO">Phone (O)</Label>
                    <Input
                      id="phoneO"
                      value={formData.phoneO}
                      onChange={(e) =>
                        handleInputChange("phoneO", e.target.value)
                      }
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneR">Phone (R)</Label>
                    <Input
                      id="phoneR"
                      value={formData.phoneR}
                      onChange={(e) =>
                        handleInputChange("phoneR", e.target.value)
                      }
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Address Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="address1">Address Line 1 *</Label>
                <Input
                  id="address1"
                  value={formData.address1}
                  onChange={(e) =>
                    handleInputChange("address1", e.target.value)
                  }
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address2">Address Line 2</Label>
                <Input
                  id="address2"
                  value={formData.address2}
                  onChange={(e) =>
                    handleInputChange("address2", e.target.value)
                  }
                  className="rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="station">Station</Label>
                  <Input
                    id="station"
                    value={formData.station}
                    onChange={(e) =>
                      handleInputChange("station", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    required
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Receiver Details
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="hasReceiver" className="text-sm">
                      Has Receiver
                    </Label>
                    <Switch
                      id="hasReceiver"
                      checked={formData.hasReceiver}
                      onCheckedChange={(checked) =>
                        handleInputChange("hasReceiver", checked)
                      }
                    />
                  </div>
                  {formData.hasReceiver && (
                    <Button
                      type="button"
                      onClick={addReceiver}
                      className="gap-2 rounded-lg"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Receiver
                    </Button>
                  )}
                </div>
              </div>

              {formData.hasReceiver && formData.receivers.length > 0 && (
                <div className="space-y-4">
                  {formData.receivers.map((receiver, index) => (
                    <div
                      key={receiver.id}
                      className="rounded-xl border border-border/60 p-4 bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium">
                          Receiver {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeReceiver(index)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name *</Label>
                          <Input
                            value={receiver.name}
                            onChange={(e) =>
                              updateReceiver(index, "name", e.target.value)
                            }
                            required
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Mobile Number *</Label>
                          <Input
                            value={receiver.mobileNo}
                            onChange={(e) =>
                              updateReceiver(index, "mobileNo", e.target.value)
                            }
                            required
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={receiver.email}
                            onChange={(e) =>
                              updateReceiver(index, "email", e.target.value)
                            }
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Pincode *</Label>
                          <div className="relative">
                            <Input
                              value={receiver.pincode}
                              onChange={(e) =>
                                handlePincodeInput(
                                  e.target.value,
                                  "receiver",
                                  index
                                )
                              }
                              required
                              className="rounded-lg"
                            />
                            {pincodeSuggestions.length > 0 && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg">
                                {pincodeSuggestions.map((pincode) => (
                                  <div
                                    key={pincode}
                                    className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                                    onClick={() =>
                                      selectPincodeSuggestion(
                                        pincode,
                                        "receiver",
                                        index
                                      )
                                    }
                                  >
                                    {pincode}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Address *</Label>
                          <Input
                            value={receiver.address}
                            onChange={(e) =>
                              updateReceiver(index, "address", e.target.value)
                            }
                            required
                            disabled={!receiver.pincode}
                            className="rounded-lg"
                            placeholder={
                              !receiver.pincode
                                ? "Please enter pincode first"
                                : "Enter address"
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City *</Label>
                          <Input
                            value={receiver.city}
                            onChange={(e) =>
                              updateReceiver(index, "city", e.target.value)
                            }
                            required
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pickup Locations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Pickup Locations
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="usePickupLocation" className="text-sm">
                      Use Pickup Location
                    </Label>
                    <Switch
                      id="usePickupLocation"
                      checked={formData.usePickupLocation}
                      onCheckedChange={(checked) =>
                        handleInputChange("usePickupLocation", checked)
                      }
                    />
                  </div>
                  {formData.usePickupLocation && (
                    <Button
                      type="button"
                      onClick={addPickupLocation}
                      className="gap-2 rounded-lg"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Location
                    </Button>
                  )}
                </div>
              </div>

              {formData.usePickupLocation &&
                formData.pickupLocations.length > 0 && (
                  <div className="space-y-4">
                    {formData.pickupLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className="rounded-xl border border-border/60 p-4 bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">
                            Pickup Location {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePickupLocation(index)}
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Location Name *</Label>
                            <Input
                              value={location.name}
                              onChange={(e) =>
                                updatePickupLocation(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              required
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Contact Person *</Label>
                            <Input
                              value={location.contactPerson}
                              onChange={(e) =>
                                updatePickupLocation(
                                  index,
                                  "contactPerson",
                                  e.target.value
                                )
                              }
                              required
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Mobile Number *</Label>
                            <Input
                              value={location.mobileNo}
                              onChange={(e) =>
                                updatePickupLocation(
                                  index,
                                  "mobileNo",
                                  e.target.value
                                )
                              }
                              required
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Pincode *</Label>
                            <div className="relative">
                              <Input
                                value={location.pincode}
                                onChange={(e) =>
                                  handlePincodeInput(
                                    e.target.value,
                                    "pickup",
                                    index
                                  )
                                }
                                required
                                className="rounded-lg"
                              />
                              {pincodeSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg">
                                  {pincodeSuggestions.map((pincode) => (
                                    <div
                                      key={pincode}
                                      className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                                      onClick={() =>
                                        selectPincodeSuggestion(
                                          pincode,
                                          "pickup",
                                          index
                                        )
                                      }
                                    >
                                      {pincode}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Address *</Label>
                            <Input
                              value={location.address}
                              onChange={(e) =>
                                updatePickupLocation(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                              required
                              disabled={!location.pincode}
                              className="rounded-lg"
                              placeholder={
                                !location.pincode
                                  ? "Please enter pincode first"
                                  : "Enter address"
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>City *</Label>
                            <Input
                              value={location.city}
                              onChange={(e) =>
                                updatePickupLocation(
                                  index,
                                  "city",
                                  e.target.value
                                )
                              }
                              required
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Business Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Business Settings
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMode">Payment Mode</Label>
                    <Select
                      value={formData.paymentMode}
                      onValueChange={(value) =>
                        handleInputChange("paymentMode", value)
                      }
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Credit">Credit</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountGroup">Account Group</Label>
                    <Select
                      value={formData.accountGroup}
                      onValueChange={(value) =>
                        handleInputChange("accountGroup", value)
                      }
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="SME">SME</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quotationType">Quotation Type</Label>
                    <Select
                      value={formData.quotationType}
                      onValueChange={(value) =>
                        handleInputChange("quotationType", value)
                      }
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Economy">Economy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="awt">AWT</Label>
                    <Input
                      id="awt"
                      type="number"
                      step="0.001"
                      value={formData.awt}
                      onChange={(e) =>
                        handleInputChange(
                          "awt",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelCharges">Fuel Charges (%)</Label>
                    <Input
                      id="fuelCharges"
                      type="number"
                      step="0.01"
                      value={formData.fuelCharges}
                      onChange={(e) =>
                        handleInputChange(
                          "fuelCharges",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fovCharges">FOV Charges (%)</Label>
                    <Input
                      id="fovCharges"
                      type="number"
                      step="0.01"
                      value={formData.fovCharges}
                      onChange={(e) =>
                        handleInputChange(
                          "fovCharges",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div> */}

              {/* Additional Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Additional Settings
                </h3>

                <div className="space-y-3">
                  {/* <div className="flex items-center justify-between">
                    <Label htmlFor="isInterStateDealer" className="text-sm">
                      Inter-State Dealer
                    </Label>
                    <Switch
                      id="isInterStateDealer"
                      checked={formData.isInterStateDealer}
                      onCheckedChange={(checked) =>
                        handleInputChange("isInterStateDealer", checked)
                      }
                    />
                  </div> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentNo">Document No</Label>
                  <Input
                    id="documentNo"
                    value={formData.documentNo}
                    onChange={(e) =>
                      handleInputChange("documentNo", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bookedBy">Booked By</Label>
                  <Input
                    id="bookedBy"
                    value={formData.bookedBy}
                    onChange={(e) =>
                      handleInputChange("bookedBy", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remark">Remarks</Label>
              <Textarea
                id="remark"
                value={formData.remark}
                onChange={(e) => handleInputChange("remark", e.target.value)}
                className="rounded-lg min-h-[80px]"
                placeholder="Additional notes or comments..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border/70">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                {customer ? "Update Customer" : "Create Customer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
