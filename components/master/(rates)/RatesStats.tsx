import { Tag, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RateRule } from "./types";

interface RatesStatsProps {
    rates: RateRule[];
}

const RatesStats = ({ rates }: RatesStatsProps) => {
    const stats = {
        totalRates: rates.length,
        activeRates: rates.filter(
            (r) => r.isActive && new Date(r.validTo) >= new Date()
        ).length,
        expiringSoon: rates.filter((r) => {
            const daysToExpiry = Math.ceil(
                (new Date(r.validTo).getTime() - new Date().getTime()) /
                (1000 * 3600 * 24)
            );
            return daysToExpiry <= 30 && daysToExpiry > 0;
        }).length,
        expiredRates: rates.filter((r) => new Date(r.validTo) < new Date()).length,
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">
                                Total Rules
                            </p>
                            <p className="text-2xl font-bold mt-1">{stats.totalRates}</p>
                        </div>
                        <div className="rounded-xl bg-primary/10 p-3">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">
                                Active Rules
                            </p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {stats.activeRates}
                            </p>
                        </div>
                        <div className="rounded-xl bg-green-500/10 p-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">
                                Expiring Soon
                            </p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">
                                {stats.expiringSoon}
                            </p>
                        </div>
                        <div className="rounded-xl bg-orange-500/10 p-3">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">
                                Expired
                            </p>
                            <p className="text-2xl font-bold text-red-600 mt-1">
                                {stats.expiredRates}
                            </p>
                        </div>
                        <div className="rounded-xl bg-red-500/10 p-3">
                            <Clock className="h-5 w-5 text-red-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RatesStats;
