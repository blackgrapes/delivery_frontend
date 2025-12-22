
import { Users, CheckCircle2, Video, AlertOctagon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Driver } from "./types";

const DriversStats = ({ drivers }: { drivers: Driver[] }) => {
    const active = drivers.filter(d => d.status === 'ACTIVE').length;
    const verified = drivers.filter(d => d.verificationStatus === 'VERIFIED').length;
    const pending = drivers.filter(d => d.verificationStatus === 'PENDING').length;
    const total = drivers.length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Drivers</p>
                            <p className="text-2xl font-bold mt-1">{total}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Active Duty</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{active}</p>
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
                            <p className="text-sm text-muted-foreground font-medium">Verified</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{verified}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Video className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Pending KFC</p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">{pending}</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-xl">
                            <AlertOctagon className="h-5 w-5 text-orange-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DriversStats;
