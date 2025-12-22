
import { Route as RouteIcon, TrendingUp, Navigation, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "./types";

const RoutesStats = ({ routes }: { routes: Route[] }) => {
    const active = routes.filter(r => r.status === 'ACTIVE').length;
    const linehaul = routes.filter(r => r.type === 'LINEHAUL').length;
    const blocked = routes.filter(r => r.status === 'BLOCKED').length;
    const total = routes.length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Routes</p>
                            <p className="text-2xl font-bold mt-1">{total}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <RouteIcon className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Active Lanes</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{active}</p>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Linehaul</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{linehaul}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Navigation className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Blocked</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{blocked}</p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-xl">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RoutesStats;
