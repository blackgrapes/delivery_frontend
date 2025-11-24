// components/master/customers/types.ts
export interface Customer {
  id: string;
  code: string;
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
  fuelCharges: number;
  fovCharges: number;
  quotationType: string;
  awt: number;
  category: string;
  paymentMode: string;
  accountGroup: string;
  isInterStateDealer: boolean;
  documentNo: string;
  bookedBy: string;
  bookedDate: string;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormData {
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
  fuelCharges: number;
  fovCharges: number;
  quotationType: string;
  awt: number;
  category: string;
  paymentMode: string;
  accountGroup: string;
  isInterStateDealer: boolean;
  documentNo: string;
  bookedBy: string;
  bookedDate: string;
  remark: string;
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
