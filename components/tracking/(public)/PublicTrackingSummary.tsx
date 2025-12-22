"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Clock,
    Package,
    Truck,
    CheckCircle2,
    AlertCircle,
    XCircle,
    QrCode,
} from "lucide-react";

interface PublicTrackingSummaryProps {
    tracking: any;
}

const statusConfig: any = {
    pending: {
        label: "Pending",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: Clock,
    },
    in_transit: {
        label: "In Transit",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Truck,
    },
    out_for_delivery: {
        label: "Out for Delivery",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Package,
    },
    delivered: {
        label: "Delivered",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle2,
    },
    exception: {
        label: "Exception",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: AlertCircle,
    },
    returned: {
        label: "Returned",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: XCircle,
    },
};

const PublicTrackingSummary = ({ tracking }: PublicTrackingSummaryProps) => {
    const status = statusConfig[tracking.status] || statusConfig.pending;
    const StatusIcon = status.icon;

    return (
        <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
            <CardContent className="p-0">
                {/* Header */}
                <div className="p-6 border-b border-border/70">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-primary/10 p-2.5">
                                <StatusIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Tracking Number
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="font-mono font-bold text-xl text-foreground tracking-tight">
                                        {tracking.awbNumber}
                                    </p>
                                    <QrCode className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 w-fit ${status.color}`}>
                            {status.label}
                        </div>
                    </div>
                </div>

                {/* Info Grid - Masked Data */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Package className="h-4 w-4 text-primary" />
                            Package Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Type</p>
                                <p className="font-medium">{tracking.package.type}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Weight</p>
                                <p className="font-medium">{tracking.package.weight}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-muted-foreground">Description</p>
                                <p className="font-medium">{tracking.package.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Delivery Status
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Destination</p>
                                <p className="text-sm font-medium">
                                    {tracking.customer.city}
                                    <span className="text-muted-foreground ml-1">(Masked)</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Current Location</p>
                                <p className="text-sm font-medium">{tracking.location.current}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Last updated: {tracking.location.lastScan}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PublicTrackingSummary;
