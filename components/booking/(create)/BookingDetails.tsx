// @/components/booking/create/BookingDetails.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { paymentModes } from "./mockData";

interface BookingDetailsProps {
  formData: {
    contents: string;
    payMode: string;
    forwardTo: string;
    thru: string;
    weight: string;
    chargeWeight: string;
    rate: string;
    fovAmt: string;
    charges: string;
    otherAddLess: string;
    netCharges: string;
    disc: string;
    fuelPercent: string;
    tax: string;
    netAmount: string;
    remark: string;
  };
  onFormChange: (field: string, value: string) => void;
}

const BookingDetails = ({ formData, onFormChange }: BookingDetailsProps) => {
  const calculateNetAmount = () => {
    const charges = parseFloat(formData.charges) || 0;
    const otherAddLess = parseFloat(formData.otherAddLess) || 0;
    const disc = parseFloat(formData.disc) || 0;
    const fuelPercent = parseFloat(formData.fuelPercent) || 0;
    const tax = parseFloat(formData.tax) || 0;

    const netCharges = charges + otherAddLess - disc;
    const fuelAmount = netCharges * (fuelPercent / 100);
    const netAmount = netCharges + fuelAmount + tax;

    onFormChange("netCharges", netCharges.toFixed(2));
    onFormChange("netAmount", netAmount.toFixed(2));
  };

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Contents</Label>
            <Input
              value={formData.contents}
              onChange={(e) => onFormChange("contents", e.target.value)}
              className="rounded-lg"
              placeholder="Enter contents"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pay Mode</Label>
            <Select
              value={formData.payMode}
              onValueChange={(value) => onFormChange("payMode", value)}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Forward To</Label>
            <Input
              value={formData.forwardTo}
              onChange={(e) => onFormChange("forwardTo", e.target.value)}
              className="rounded-lg"
              placeholder="Forward to"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Thru</Label>
            <Input
              value={formData.thru}
              onChange={(e) => onFormChange("thru", e.target.value)}
              className="rounded-lg"
              placeholder="Through"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Weight</Label>
            <Input
              type="number"
              value={formData.weight}
              onChange={(e) => onFormChange("weight", e.target.value)}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Charge Weight</Label>
            <Input
              type="number"
              value={formData.chargeWeight}
              onChange={(e) => onFormChange("chargeWeight", e.target.value)}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Rate</Label>
            <Input
              type="number"
              value={formData.rate}
              onChange={(e) => onFormChange("rate", e.target.value)}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">FOV Amt</Label>
            <Input
              type="number"
              value={formData.fovAmt}
              onChange={(e) => onFormChange("fovAmt", e.target.value)}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Charges</Label>
            <Input
              type="number"
              value={formData.charges}
              onChange={(e) => {
                onFormChange("charges", e.target.value);
                calculateNetAmount();
              }}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Other Add/Less</Label>
            <Input
              type="number"
              value={formData.otherAddLess}
              onChange={(e) => {
                onFormChange("otherAddLess", e.target.value);
                calculateNetAmount();
              }}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Discount</Label>
            <Input
              type="number"
              value={formData.disc}
              onChange={(e) => {
                onFormChange("disc", e.target.value);
                calculateNetAmount();
              }}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Net Charges</Label>
            <Input
              type="number"
              value={formData.netCharges}
              readOnly
              className="rounded-lg bg-muted/50"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Fuel %</Label>
            <Input
              type="number"
              value={formData.fuelPercent}
              onChange={(e) => {
                onFormChange("fuelPercent", e.target.value);
                calculateNetAmount();
              }}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tax</Label>
            <Input
              type="number"
              value={formData.tax}
              onChange={(e) => {
                onFormChange("tax", e.target.value);
                calculateNetAmount();
              }}
              className="rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Net Amount</Label>
            <Input
              type="number"
              value={formData.netAmount}
              readOnly
              className="rounded-lg bg-muted/50 font-semibold"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Remarks</Label>
          <Textarea
            value={formData.remark}
            onChange={(e) => onFormChange("remark", e.target.value)}
            className="rounded-lg min-h-[80px]"
            placeholder="Additional remarks..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetails;
