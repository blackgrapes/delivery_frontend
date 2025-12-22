
export interface Route {
  id: string;
  code: string;
  sourceCity: string;
  destinationCity: string;
  sourceHub: string;
  destinationHub: string;
  distanceKm: number;
  transitTimeHours: number;
  stops: string[]; // intermediate hubs
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  type: 'LINEHAUL' | 'FEEDER' | 'LAST_MILE';
  isReturnRoute: boolean;
  baseCost: number;
}

export interface RouteFormData extends Omit<Route, 'id' | 'code'> {}
