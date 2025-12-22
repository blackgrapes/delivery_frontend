
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Fuel, Calendar, Edit, Trash2 } from "lucide-react";
import { Vehicle } from "./types";

interface VehiclesListProps {
    vehicles: Vehicle[];
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (id: string) => void;
}

const VehiclesList = ({ vehicles, onEdit, onDelete }: VehiclesListProps) => {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="py-3 px-4 border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Fleet List
                    <Badge variant="secondary" className="ml-auto">
                        {vehicles.length} Vehicles
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="border-border/60 hover:border-primary/50 transition-colors">
                        <CardContent className="p-3 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-muted rounded-xl h-fit">
                                    <Truck className="h-6 w-6 text-foreground" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{vehicle.regNo}</h3>
                                        <Badge variant={
                                            vehicle.status === 'AVAILABLE' ? 'success' :
                                                vehicle.status === 'IN_TRANSIT' ? 'default' : 'destructive'
                                        }>{vehicle.status.replace("_", " ")}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{vehicle.make} {vehicle.model} • {vehicle.type.replace("_", " ")}</p>

                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Fuel className="h-3 w-3" />
                                            {vehicle.fuelType}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Ins: {vehicle.insuranceExpiry}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Load: {vehicle.capacity / 1000}T</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Driver</p>
                                    <p className="font-medium">{vehicle.driverName || "Unassigned"}</p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(vehicle)}>
                                        <Edit className="h-3 w-3 mr-1" /> Edit
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => onDelete(vehicle.id)}>
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

export default VehiclesList;
