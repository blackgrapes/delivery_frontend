// components/master/pincodes/PincodeForm.tsx
import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Clock,
  Truck,
  Package,
  CheckCircle2,
  XCircle,
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
import { Pincode, PincodeFormData } from "./types";
import { zonesList } from "../(rates)/mockData";

interface PincodeFormProps {
  pincode: Pincode | null;
  onSave: (data: PincodeFormData) => void;
  onCancel: () => void;
}

const PincodeForm = ({ pincode, onSave, onCancel }: PincodeFormProps) => {
  const [formData, setFormData] = useState<PincodeFormData>({
    pincode: "",
    city: "",
    state: "",
    district: "",
    country: "India",
    serviceability: "standard",
    deliveryTime: "2-3 days",
    codAvailable: true,
    pickupAvailable: true,
    lastMilePartner: "",
    hubAssigned: "",
    status: "active",
    specialInstructions: "",
    zone: "",
  });

  useEffect(() => {
    if (pincode) {
      setFormData({
        pincode: pincode.pincode,
        city: pincode.city,
        state: pincode.state,
        district: pincode.district,
        country: pincode.country,
        serviceability: pincode.serviceability,
        deliveryTime: pincode.deliveryTime,
        codAvailable: pincode.codAvailable,
        pickupAvailable: pincode.pickupAvailable,
        lastMilePartner: pincode.lastMilePartner,
        hubAssigned: pincode.hubAssigned,
        status: pincode.status,
        specialInstructions: pincode.specialInstructions,
        zone: pincode.zone || "",
      });
    }
  }, [pincode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof PincodeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getServiceabilityColor = (serviceability: string) => {
    switch (serviceability) {
      case "same_day":
        return "bg-green-100 text-green-800 border-green-200";
      case "next_day":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "express":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "standard":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "non_serviceable":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-border/70 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/70">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {pincode ? "Edit Pincode" : "Add New Pincode"}
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
            {/* Pincode Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Pincode Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  required
                  className="rounded-lg font-mono"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) =>
                      handleInputChange("district", e.target.value)
                    }
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone">Zone Assignment *</Label>
                <Select
                  value={formData.zone}
                  onValueChange={(value) => handleInputChange("zone", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zonesList.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Linked to Rate Rules for pricing calculation
                </p>
              </div>
            </div>

            {/* Serviceability Settings */}
            {/* <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Serviceability Settings
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceability">Service Type *</Label>
                  <Select
                    value={formData.serviceability}
                    onValueChange={(value: any) =>
                      handleInputChange("serviceability", value)
                    }
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same_day">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          Same Day
                        </div>
                      </SelectItem>
                      <SelectItem value="next_day">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          Next Day
                        </div>
                      </SelectItem>
                      <SelectItem value="express">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-purple-600" />
                          Express (1-2 days)
                        </div>
                      </SelectItem>
                      <SelectItem value="standard">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          Standard (2-3 days)
                        </div>
                      </SelectItem>
                      <SelectItem value="non_serviceable">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Non-Serviceable
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time *</Label>
                  <Input
                    id="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={(e) =>
                      handleInputChange("deliveryTime", e.target.value)
                    }
                    required
                    className="rounded-lg"
                    placeholder="e.g., 1-2 days, Same day"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastMilePartner">Last Mile Partner</Label>
                  <Input
                    id="lastMilePartner"
                    value={formData.lastMilePartner}
                    onChange={(e) =>
                      handleInputChange("lastMilePartner", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hubAssigned">Hub Assigned</Label>
                  <Input
                    id="hubAssigned"
                    value={formData.hubAssigned}
                    onChange={(e) =>
                      handleInputChange("hubAssigned", e.target.value)
                    }
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div> */}

            {/* Service Options */}
            {/* <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                Service Options
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <Label
                      htmlFor="codAvailable"
                      className="text-sm font-medium"
                    >
                      COD Available
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Cash on delivery service
                    </p>
                  </div>
                  <Switch
                    id="codAvailable"
                    checked={formData.codAvailable}
                    onCheckedChange={(checked) =>
                      handleInputChange("codAvailable", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <Label
                      htmlFor="pickupAvailable"
                      className="text-sm font-medium"
                    >
                      Pickup Available
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Pickup service from location
                    </p>
                  </div>
                  <Switch
                    id="pickupAvailable"
                    checked={formData.pickupAvailable}
                    onCheckedChange={(checked) =>
                      handleInputChange("pickupAvailable", checked)
                    }
                  />
                </div>
              </div>
            </div> */}

            {/* Status & Additional Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Status
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="status">Pincode Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Inactive
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                  Preview
                </h3>

                <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`rounded-full border ${getServiceabilityColor(
                        formData.serviceability
                      )} px-2 py-1 text-xs flex items-center gap-1`}
                    >
                      {formData.serviceability.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Badge
                      variant={
                        formData.status === "active" ? "success" : "secondary"
                      }
                      className="rounded-full text-xs"
                    >
                      {formData.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Delivery: </span>
                    <span className="font-medium">{formData.deliveryTime}</span>
                  </div>
                  {formData.codAvailable && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      COD Available
                    </Badge>
                  )}
                  {formData.pickupAvailable && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      Pickup Available
                    </Badge>
                  )}
                </div>
              </div> */}
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
                className="rounded-lg min-h-[80px]"
                placeholder="Any special delivery instructions, restrictions, or notes..."
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
                <MapPin className="h-4 w-4" />
                {pincode ? "Update Pincode" : "Create Pincode"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PincodeForm;
