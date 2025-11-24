// @/components/booking/create/SenderDetails.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer, PickupLocation } from "./types";

interface SenderDetailsProps {
  sender: Customer | null;
  pickupLocation: PickupLocation | null;
  onPickupLocationChange: (location: PickupLocation | null) => void;
}

const SenderDetails = ({
  sender,
  pickupLocation,
  onPickupLocationChange,
}: SenderDetailsProps) => {
  if (!sender) {
    return (
      <Card className="rounded-2xl border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Sender Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Please select a sender using Document No search
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">Sender Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Name</Label>
            <Input
              value={sender.name}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Contact Person</Label>
            <Input
              value={sender.contactPerson}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Address</Label>
          <Input
            value={`${sender.address1}, ${sender.address2}`}
            readOnly
            className="rounded-lg bg-muted/50"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">City</Label>
            <Input
              value={sender.city}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Station</Label>
            <Input
              value={sender.station}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pincode</Label>
            <Input
              value={sender.pincode}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mobile No</Label>
            <Input
              value={sender.mobileNo}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">GSTIN</Label>
            <Input
              value={sender.gstin || "N/A"}
              readOnly
              className="rounded-lg bg-muted/50"
            />
          </div>
        </div>

        {sender.usePickupLocation && sender.pickupLocations.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pickup Location</Label>
            <Select
              value={pickupLocation?.id || ""}
              onValueChange={(value) => {
                const location =
                  sender.pickupLocations.find((loc) => loc.id === value) ||
                  null;
                onPickupLocationChange(location);
              }}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                {sender.pickupLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name} - {location.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {pickupLocation && (
          <div className="p-3 border rounded-lg bg-blue-50/50">
            <h4 className="font-medium text-sm mb-2">
              Selected Pickup Location:
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <strong>Name:</strong> {pickupLocation.name}
              </div>
              <div>
                <strong>Address:</strong> {pickupLocation.address},{" "}
                {pickupLocation.city}
              </div>
              <div>
                <strong>Contact:</strong> {pickupLocation.contactPerson} (
                {pickupLocation.mobileNo})
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SenderDetails;
