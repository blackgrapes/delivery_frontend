
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Clock, ArrowRight, Edit, Trash2, MapPin } from "lucide-react";
import { Route } from "./types";

interface RoutesListProps {
    routes: Route[];
    onEdit: (route: Route) => void;
    onDelete: (id: string) => void;
}

const RoutesList = ({ routes, onEdit, onDelete }: RoutesListProps) => {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="py-3 px-4 border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Routes List
                    <Badge variant="secondary" className="ml-auto">
                        {routes.length} Routes
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                {routes.map((route) => (
                    <Card key={route.id} className="border-border/60 hover:border-primary/50 transition-colors">
                        <CardContent className="p-3 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <div className="flex gap-4 flex-1">
                                <div className="p-3 bg-muted rounded-xl h-fit">
                                    <Map className="h-6 w-6 text-foreground" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                        <h3 className="font-bold text-lg">{route.code}</h3>
                                        <Badge variant={
                                            route.status === 'ACTIVE' ? 'success' :
                                                route.status === 'BLOCKED' ? 'destructive' : 'secondary'
                                        }>{route.status}</Badge>
                                        <Badge variant="outline">{route.type.replace("_", " ")}</Badge>
                                    </div>

                                    <div className="flex items-center gap-3 mt-2 text-sm font-medium">
                                        <span>{route.sourceCity}</span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        <span>{route.destinationCity}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {route.distanceKm} km
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {route.transitTimeHours} hrs
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Via: {route.stops.length > 0 ? route.stops.join(", ") : "Direct"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(route)}>
                                    <Edit className="h-3 w-3 mr-1" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => onDelete(route.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

export default RoutesList;
