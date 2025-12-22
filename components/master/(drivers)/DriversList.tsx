
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, FileText, Calendar, Edit, Trash2, Star } from "lucide-react";
import { Driver } from "./types";

interface DriversListProps {
    drivers: Driver[];
    onEdit: (driver: Driver) => void;
    onDelete: (id: string) => void;
}

const DriversList = ({ drivers, onEdit, onDelete }: DriversListProps) => {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="py-3 px-4 border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Drivers List
                    <Badge variant="secondary" className="ml-auto">
                        {drivers.length} Drivers
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                {drivers.map((driver) => (
                    <Card key={driver.id} className="border-border/60 hover:border-primary/50 transition-colors">
                        <CardContent className="p-3 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-muted rounded-xl h-fit">
                                    <User className="h-6 w-6 text-foreground" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{driver.name}</h3>
                                        <Badge variant={
                                            driver.status === 'ACTIVE' ? 'success' :
                                                driver.status === 'SUSPENDED' ? 'destructive' : 'secondary'
                                        }>{driver.status.replace("_", " ")}</Badge>
                                        <div className="flex items-center text-yellow-500 text-sm">
                                            <Star className="h-3 w-3 fill-current mr-1" />
                                            {driver.rating}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{driver.hubId} • Joined: {driver.dateOfJoining}</p>

                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            {driver.phone}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            Lic: {driver.licenseNo}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Exp: {driver.licenseExpiry}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Verification</p>
                                    <Badge variant={
                                        driver.verificationStatus === 'VERIFIED' ? 'outline' : 'destructive'
                                    } className="mt-1">{driver.verificationStatus}</Badge>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(driver)}>
                                        <Edit className="h-3 w-3 mr-1" /> Edit
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => onDelete(driver.id)}>
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

export default DriversList;
