
export interface Pincode {
  id: string;
  pincode: string;
  city: string;
  state: string;
  zone: string;
  district: string;
  country: string;
  
  // Compliance & Restrictions
  isODA: boolean;
  odaType?: "REGULAR" | "SPECIAL" | "REMOTE"; // Regular ODA, Special, etc.
  embargoTags: string[]; // e.g. ["LIQUIDS", "JEWELRY"]
  stateFormRequired: boolean;

  // Serviceability Details
  serviceability:
    | "standard"
    | "express"
    | "same_day"
    | "next_day"
    | "non_serviceable";
  deliveryTime: string; // Display label e.g. "2-3 days"
  tatMinDays?: number;
  tatMaxDays?: number;
  cutoffTime?: string; // HH:mm format for same-day eligibility
  
  // Payment & Order Rules
  codAvailable: boolean;
  prepaidOnly: boolean;
  minOrderValue?: number;
  maxCodAmount?: number;
  
  // Operations & Logistics
  pickupAvailable: boolean;
  reversePickupAvailable: boolean;
  
  // Ownership & Mapping
  controllingBranchId: string; // The branch managing this pincode area
  serviceCategory: "SELF" | "PARTNER" | "FRANCHISE";
  lastMilePartner: string; // Name of partner if PARTNER/FRANCHISE
  hubAssigned: string; // Operational Hub
  
  status: "active" | "inactive";
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface PincodeFormData extends Omit<Pincode, 'id' | 'createdAt' | 'updatedAt'> {}
