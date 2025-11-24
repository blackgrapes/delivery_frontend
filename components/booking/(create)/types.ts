// @/components/booking/create/types.ts
export interface BookingFormData {
  documentNo: string;
  sender: Customer | null;
  receiver: Receiver | null;
  pickupLocation: PickupLocation | null;
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
}

export interface Customer {
  id: string;
  code: string;
  documentNo: string;
  name: string;
  contactPerson: string;
  address1: string;
  address2: string;
  city: string;
  station: string;
  pincode: string;
  gstin?: string;
  mobileNo: string;
  phoneO: string;
  phoneR: string;
  email: string;
  hasReceiver: boolean;
  receivers: Receiver[];
  usePickupLocation: boolean;
  pickupLocations: PickupLocation[];
  status: "active" | "inactive";
}

export interface Receiver {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  mobileNo: string;
  email?: string;
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  contactPerson: string;
  mobileNo: string;
}
