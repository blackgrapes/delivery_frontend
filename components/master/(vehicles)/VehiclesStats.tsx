
import { Truck, AlertTriangle, CheckCircle2, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle } from "./types";

const VehiclesStats = ({ vehicles }: { vehicles: Vehicle[] }) => {
    const available = vehicles.filter(v => v.status === 'AVAILABLE').length;
    const inTransit = vehicles.filter(v => v.status === 'IN_TRANSIT').length;
    const maintenance = vehicles.filter(v => v.status === 'MAINTENANCE').length;
    const total = vehicles.length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Fleet</p>
                            <p className="text-2xl font-bold mt-1">{total}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Truck className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">In Transit</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{inTransit}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Available</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{available}</p>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Maintenance</p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">{maintenance}</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-xl">
                            <Wrench className="h-5 w-5 text-orange-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default VehiclesStats;
