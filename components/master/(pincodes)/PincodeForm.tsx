import { useState, useEffect } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Pincode, PincodeFormData } from "./types";
import { MapPin, Clock, Truck, Package, Globe, ShieldCheck, Building2, AlertTriangle } from "lucide-react";
import { zonesList } from "../(rates)/mockData";
import { Checkbox } from "@/components/ui/checkbox";

interface PincodeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: PincodeFormData) => void;
  pincode: Pincode | null;
}

const PincodeForm = ({ open, onOpenChange, onSave, pincode }: PincodeFormProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<PincodeFormData>({
    pincode: "",
    city: "",
    state: "",
    district: "",
    country: "India",
    zone: "Zone A",

    isODA: false,
    odaType: "REGULAR",
    embargoTags: [],
    stateFormRequired: false,

    serviceability: "standard",
    deliveryTime: "2-3 days",

    codAvailable: true,
    prepaidOnly: false,
    maxCodAmount: 50000,
    minOrderValue: 0,

    pickupAvailable: true,
    reversePickupAvailable: true,

    controllingBranchId: "",
    serviceCategory: "SELF",
    lastMilePartner: "",
    hubAssigned: "",

    status: "active",
    specialInstructions: "",
  });

  const [embargoInput, setEmbargoInput] = useState("");

  useEffect(() => {
    if (pincode) {
      const { id, createdAt, updatedAt, ...rest } = pincode;
      setFormData(rest);
      setEmbargoInput(pincode.embargoTags?.join(", ") || "");
    } else {
      setFormData({
        pincode: "",
        city: "",
        state: "",
        district: "",
        country: "India",
        zone: "Zone A",
        isODA: false,
        odaType: "REGULAR",
        embargoTags: [],
        stateFormRequired: false,
        serviceability: "standard",
        deliveryTime: "2-3 days",
        codAvailable: true,
        prepaidOnly: false,
        maxCodAmount: 50000,
        minOrderValue: 0,
        pickupAvailable: true,
        reversePickupAvailable: true,
        controllingBranchId: "",
        serviceCategory: "SELF",
        lastMilePartner: "",
        hubAssigned: "",
        status: "active",
        specialInstructions: "",
      });
      setEmbargoInput("");
    }
  }, [pincode, open]);

  // Auto-fill logic for demonstration
  useEffect(() => {
    if (formData.pincode.length === 6 && !pincode) { // Only on new entry
      const code = formData.pincode;
      // Mock DB lookup
      const mockGeo: Record<string, { city: string, state: string, district: string }> = {
        "400001": { city: "Mumbai", state: "Maharashtra", district: "Mumbai City" },
        "400069": { city: "Mumbai", state: "Maharashtra", district: "Mumbai Suburban" },
        "110001": { city: "New Delhi", state: "Delhi", district: "New Delhi" },
        "560001": { city: "Bengaluru", state: "Karnataka", district: "Bengaluru Urban" },
        "700001": { city: "Kolkata", state: "West Bengal", district: "Kolkata" },
        "600001": { city: "Chennai", state: "Tamil Nadu", district: "Chennai" },
      };

      if (mockGeo[code]) {
        setFormData(prev => ({
          ...prev,
          ...mockGeo[code]
        }));
      } else if (code.startsWith("40")) {
        setFormData(prev => ({ ...prev, city: "Mumbai", state: "Maharashtra", district: "Mumbai Suburban" }));
      } else if (code.startsWith("11")) {
        setFormData(prev => ({ ...prev, city: "Delhi", state: "Delhi", district: "North Delhi" }));
      }
    }
  }, [formData.pincode, pincode]);

  const handleChange = (field: keyof PincodeFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmbargoChange = (val: string) => {
    setEmbargoInput(val);
    const tags = val.split(",").map(t => t.trim().toUpperCase()).filter(Boolean);
    handleChange("embargoTags", tags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[1000px] sm:w-[1000px] sm:max-w-[1000px] flex flex-col h-full">
        <SheetHeader className="flex-none">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <SheetTitle>{pincode ? "Edit Pincode Configuration" : "Add New Pincode"}</SheetTitle>
              <SheetDescription>
                {pincode ? `Update serviceability parameters for ${pincode.pincode}` : "Define new serviceable area parameters."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 pr-2">
          <form id="pincode-form" onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Details & Branch</TabsTrigger>
                <TabsTrigger value="service">Service & Compliance</TabsTrigger>
                <TabsTrigger value="logistics">Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="6-digit Pincode"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      maxLength={6}
                      className="font-mono text-lg tracking-widest"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Area Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val: any) => handleChange("status", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active Service</SelectItem>
                        <SelectItem value="inactive">Temporarily Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2"><Globe className="h-4 w-4 text-blue-600" /> Location Details</h4>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleChange("district", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> Branch Mapping</h4>
                    <div className="space-y-2">
                      <Label htmlFor="branchId">Controlling Branch ID *</Label>
                      <Input
                        id="branchId"
                        placeholder="e.g. BR-MUM-01"
                        value={formData.controllingBranchId}
                        onChange={(e) => handleChange("controllingBranchId", e.target.value)}
                        required
                      />
                      <p className="text-[10px] text-muted-foreground">The branch responsible for pickups/deliveries here.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceCategory">Service Ownership</Label>
                      <Select
                        value={formData.serviceCategory}
                        onValueChange={(val: any) => handleChange("serviceCategory", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SELF">Self Owned (Company Branch)</SelectItem>
                          <SelectItem value="PARTNER">Logistics Partner</SelectItem>
                          <SelectItem value="FRANCHISE">Franchise Outlet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="service" className="space-y-6 mt-6">
                <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" /> Out of Delivery Area (ODA)
                    </h4>
                    <Switch
                      checked={formData.isODA}
                      onCheckedChange={(checked) => handleChange("isODA", checked)}
                    />
                  </div>
                  {formData.isODA && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>ODA Categorization</Label>
                        <Select
                          value={formData.odaType}
                          onValueChange={(val: any) => handleChange("odaType", val)}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="REGULAR">Regular ODA (Extra Charges Apply)</SelectItem>
                            <SelectItem value="SPECIAL">Special ODA (North East / JK)</SelectItem>
                            <SelectItem value="REMOTE">Remote Location (Limited Service)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Serviceability Tier</Label>
                      <Select
                        value={formData.serviceability}
                        onValueChange={(val: any) => handleChange("serviceability", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (Regular)</SelectItem>
                          <SelectItem value="express">Express (Fast)</SelectItem>
                          <SelectItem value="same_day">Same Day Delivery</SelectItem>
                          <SelectItem value="next_day">Next Day Delivery</SelectItem>
                          <SelectItem value="non_serviceable">Non Serviceable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="minTat" className="text-xs">Last Mile Min (Days)</Label>
                        <Input
                          id="minTat"
                          type="number"
                          min={0}
                          value={formData.tatMinDays ?? 0}
                          onChange={(e) => {
                            const min = parseInt(e.target.value) || 0;
                            const max = formData.tatMaxDays && formData.tatMaxDays < min ? min : (formData.tatMaxDays || 0);
                            let label = `${min}-${max} days`;
                            if (min === 0 && max === 0) label = "Same Day";
                            else if (min === 1 && max === 1) label = "Next Day";

                            setFormData(prev => ({ ...prev, tatMinDays: min, deliveryTime: label }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxTat" className="text-xs">Last Mile Max (Days)</Label>
                        <Input
                          id="maxTat"
                          type="number"
                          min={formData.tatMinDays || 0}
                          value={formData.tatMaxDays ?? 0}
                          onChange={(e) => {
                            const max = parseInt(e.target.value) || 0;
                            const min = formData.tatMinDays || 0;
                            let label = `${min}-${max} days`;
                            if (min === 0 && max === 0) label = "Same Day";
                            else if (min === 1 && max === 1) label = "Next Day";

                            setFormData(prev => ({ ...prev, tatMaxDays: max, deliveryTime: label }));
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground border-l-2 border-primary/20 pl-2 mt-2">
                      Time from <b>Destination Hub</b> to Doorstep. <br />
                      <i>Total TAT = Transit Time (Zone) + Last Mile.</i>
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cutoff">Cutoff Time (For Same/Next Day)</Label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="cutoff"
                          type="time"
                          className="pl-9"
                          value={formData.cutoffTime || "14:00"}
                          onChange={(e) => handleChange("cutoffTime", e.target.value)}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Orders after this time push to next day calculation.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tat">Service SLA Label</Label>
                      <Input
                        id="tat"
                        value={formData.deliveryTime}
                        readOnly
                        className="bg-muted text-muted-foreground font-medium"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Payment Rules</h4>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor="cod">Enabled COD?</Label>
                      <Switch
                        id="cod"
                        checked={formData.codAvailable && !formData.prepaidOnly}
                        onCheckedChange={(c) => handleChange("codAvailable", c)}
                        disabled={formData.prepaidOnly}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                      <Label htmlFor="prepaid">Prepaid Only?</Label>
                      <Checkbox
                        id="prepaid"
                        checked={formData.prepaidOnly}
                        onCheckedChange={(c) => {
                          handleChange("prepaidOnly", c);
                          if (c) handleChange("codAvailable", false);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max COD Limit (₹)</Label>
                      <Input
                        type="number"
                        value={formData.maxCodAmount}
                        onChange={(e) => handleChange("maxCodAmount", parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Compliance</h4>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor="stateForm">State Forms Required?</Label>
                      <Switch
                        id="stateForm"
                        checked={formData.stateFormRequired}
                        onCheckedChange={(c) => handleChange("stateFormRequired", c)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Embargoed Items</Label>
                      <Input
                        placeholder="LIQUIDS, JEWELRY (Comma separated)"
                        value={embargoInput}
                        onChange={(e) => handleEmbargoChange(e.target.value)}
                      />
                      <p className="text-[10px] text-muted-foreground">Restricted goods for this pincode.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logistics" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Last Mile Setup</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hub">Mapped Hub</Label>
                      <Input
                        id="hub"
                        placeholder="e.g. Mumbai North Hub"
                        value={formData.hubAssigned}
                        onChange={(e) => handleChange("hubAssigned", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner">Last Mile Partner Name</Label>
                      <Input
                        id="partner"
                        placeholder="e.g. BlueDart / Ecom Express"
                        value={formData.lastMilePartner}
                        onChange={(e) => handleChange("lastMilePartner", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor="pickup">Pickups Allowed?</Label>
                      <Switch
                        id="pickup"
                        checked={formData.pickupAvailable}
                        onCheckedChange={(c) => handleChange("pickupAvailable", c)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor="revPickup">Reverse Pickup (Returns)?</Label>
                      <Switch
                        id="revPickup"
                        checked={formData.reversePickupAvailable}
                        onCheckedChange={(c) => handleChange("reversePickupAvailable", c)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Ops Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Enter specific instructions for delivery..."
                      value={formData.specialInstructions}
                      onChange={(e) => handleChange("specialInstructions", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </div>

        <SheetFooter className="flex-none border-t border-border/50 p-6 bg-background">
          <div className="flex gap-2 w-full justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" form="pincode-form">
              {pincode ? "Update Configuration" : "Add Pincode"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PincodeForm;
