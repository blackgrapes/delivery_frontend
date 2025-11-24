// @/components/booking/create/ReceiverDetails.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer, Receiver } from "./types";
import { useState, useEffect } from "react";

interface ReceiverDetailsProps {
  sender: Customer | null;
  receiver: Receiver | null;
  onReceiverChange: (receiver: Receiver | null) => void;
}

const ReceiverDetails = ({
  sender,
  receiver,
  onReceiverChange,
}: ReceiverDetailsProps) => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualReceiver, setManualReceiver] = useState<Receiver>({
    id: "manual-receiver",
    name: "",
    address: "",
    city: "",
    pincode: "",
    mobileNo: "",
    email: "",
  });

  // Reset manual mode when sender changes
  useEffect(() => {
    if (sender && sender.hasReceiver && sender.receivers.length > 0) {
      setIsManualMode(false);
    } else {
      setIsManualMode(true);
    }
  }, [sender]);

  // Update manual receiver data when it changes
  useEffect(() => {
    if (isManualMode && manualReceiver.name.trim()) {
      onReceiverChange(manualReceiver);
    }
  }, [manualReceiver, isManualMode, onReceiverChange]);

  const handleManualInputChange = (field: keyof Receiver, value: string) => {
    setManualReceiver((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!sender) {
    return (
      <Card className="rounded-2xl border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Receiver Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Please select a sender first
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">Receiver Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode Selection */}
        {sender.hasReceiver && sender.receivers.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Receiver Selection</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={!isManualMode ? "default" : "outline"}
                onClick={() => setIsManualMode(false)}
                className="flex-1 rounded-lg"
              >
                Select from List
              </Button>
              <Button
                type="button"
                variant={isManualMode ? "default" : "outline"}
                onClick={() => setIsManualMode(true)}
                className="flex-1 rounded-lg"
              >
                Enter Manually
              </Button>
            </div>
          </div>
        )}

        {/* Select from Existing Receivers */}
        {!isManualMode && sender.hasReceiver && sender.receivers.length > 0 && (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Receiver</Label>
              <Select
                value={receiver?.id || ""}
                onValueChange={(value) => {
                  const selectedReceiver =
                    sender.receivers.find((rec) => rec.id === value) || null;
                  onReceiverChange(selectedReceiver);
                }}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select receiver" />
                </SelectTrigger>
                <SelectContent>
                  {sender.receivers.map((receiver) => (
                    <SelectItem key={receiver.id} value={receiver.id}>
                      {receiver.name} - {receiver.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {receiver && (
              <div className="p-3 border rounded-lg bg-green-50/50">
                <h4 className="font-medium text-sm mb-2">
                  Receiver Information:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      value={receiver.name}
                      readOnly
                      className="rounded-lg bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Mobile No</Label>
                    <Input
                      value={receiver.mobileNo}
                      readOnly
                      className="rounded-lg bg-muted/50"
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <Input
                    value={receiver.address}
                    readOnly
                    className="rounded-lg bg-muted/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">City</Label>
                    <Input
                      value={receiver.city}
                      readOnly
                      className="rounded-lg bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Pincode</Label>
                    <Input
                      value={receiver.pincode}
                      readOnly
                      className="rounded-lg bg-muted/50"
                    />
                  </div>
                </div>
                {receiver.email && (
                  <div className="space-y-2 mt-2">
                    <Label className="text-sm font-medium">Email</Label>
                    <Input
                      value={receiver.email}
                      readOnly
                      className="rounded-lg bg-muted/50"
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Manual Receiver Input */}
        {isManualMode && (
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-blue-50/50">
              <h4 className="font-medium text-sm mb-3 text-blue-800">
                Enter Receiver Details Manually
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Name *</Label>
                  <Input
                    value={manualReceiver.name}
                    onChange={(e) =>
                      handleManualInputChange("name", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter receiver name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mobile No *</Label>
                  <Input
                    value={manualReceiver.mobileNo}
                    onChange={(e) =>
                      handleManualInputChange("mobileNo", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <Label className="text-sm font-medium">Address *</Label>
                <Input
                  value={manualReceiver.address}
                  onChange={(e) =>
                    handleManualInputChange("address", e.target.value)
                  }
                  className="rounded-lg"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City *</Label>
                  <Input
                    value={manualReceiver.city}
                    onChange={(e) =>
                      handleManualInputChange("city", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Pincode *</Label>
                  <Input
                    value={manualReceiver.pincode}
                    onChange={(e) =>
                      handleManualInputChange("pincode", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  value={manualReceiver.email || ""}
                  onChange={(e) =>
                    handleManualInputChange("email", e.target.value)
                  }
                  className="rounded-lg"
                  placeholder="Enter email address"
                />
              </div>

              {manualReceiver.name.trim() && (
                <div className="mt-3 p-2 bg-green-100 rounded-lg">
                  <p className="text-xs text-green-800">
                    ✓ Receiver data will be saved with booking
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Receivers Available - Auto Manual Mode */}
        {/* {!sender.hasReceiver && (
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-orange-50/50">
              <h4 className="font-medium text-sm mb-3 text-orange-800">
                No receivers available for this sender. Please enter receiver
                details manually.
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Name *</Label>
                  <Input
                    value={manualReceiver.name}
                    onChange={(e) =>
                      handleManualInputChange("name", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter receiver name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mobile No *</Label>
                  <Input
                    value={manualReceiver.mobileNo}
                    onChange={(e) =>
                      handleManualInputChange("mobileNo", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <Label className="text-sm font-medium">Address *</Label>
                <Input
                  value={manualReceiver.address}
                  onChange={(e) =>
                    handleManualInputChange("address", e.target.value)
                  }
                  className="rounded-lg"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City *</Label>
                  <Input
                    value={manualReceiver.city}
                    onChange={(e) =>
                      handleManualInputChange("city", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Pincode *</Label>
                  <Input
                    value={manualReceiver.pincode}
                    onChange={(e) =>
                      handleManualInputChange("pincode", e.target.value)
                    }
                    className="rounded-lg"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  value={manualReceiver.email || ""}
                  onChange={(e) =>
                    handleManualInputChange("email", e.target.value)
                  }
                  className="rounded-lg"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};


export default ReceiverDetails;
