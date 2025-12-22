
export interface Vehicle {
  id: string;
  regNo: string;
  type: 'TRUCK_10T' | 'TRUCK_5T' | 'PICKUP_VAN' | 'BIKE' | 'CONTAINER_32FT';
  make: string; // e.g., Tata, Eicher
  model: string;
  driverName?: string;
  driverPhone?: string;
  capacity: number; // in kg
  volumetricCapacity?: number; // in cft
  status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE' | 'BREAKDOWN';
  currentLocation?: string; // Hub or City
  insuranceExpiry: string;
  fitnessExpiry: string;
  fuelType: 'DIESEL' | 'PETROL' | 'CNG' | 'ELECTRIC';
}

export interface VehicleFormData extends Omit<Vehicle, 'id'> {}
