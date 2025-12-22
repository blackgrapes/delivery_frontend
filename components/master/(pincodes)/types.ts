// components/master/pincodes/types.ts
export interface Pincode {
  id: string;
  pincode: string;
  city: string;
  state: string;
  zone: string;
  district: string;
  country: string;
  serviceability:
    | "standard"
    | "express"
    | "same_day"
    | "next_day"
    | "non_serviceable";
  deliveryTime: string;
  codAvailable: boolean;
  pickupAvailable: boolean;
  lastMilePartner: string;
  hubAssigned: string;
  status: "active" | "inactive";
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface PincodeFormData {
  pincode: string;
  city: string;
  state: string;
  zone: string;
  district: string;
  country: string;
  serviceability:
    | "standard"
    | "express"
    | "same_day"
    | "next_day"
    | "non_serviceable";
  deliveryTime: string;
  codAvailable: boolean;
  pickupAvailable: boolean;
  lastMilePartner: string;
  hubAssigned: string;
  status: "active" | "inactive";
  specialInstructions: string;
}
