// components/master/rates/RatesList.tsx
import {
    Tag,
    Eye,
    Edit,
    Trash2,
    Package,
    Map,
    Percent,
    Calendar,
    CheckCircle2,
    AlertCircle,
    X,
    Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RateRule } from "./types";

interface RatesListProps {
    rates: RateRule[];
    onEdit: (rate: RateRule) => void;
    onDelete: (id: string) => void;
    onShowDetails: (rate: RateRule) => void; // New prop
    onCreate: () => void;
    expandedRates: string[];
    toggleExpand: (id: string) => void;
}

const RatesList = ({
    rates,
    onEdit,
    onDelete,
    onShowDetails,
    onCreate,
    expandedRates,
    toggleExpand,
}: RatesListProps) => {
    const getStatusBadge = (rate: RateRule) => {
        if (!rate.isActive) {
            return (
                <Badge variant="secondary" className="gap-1 h-6">
                    <X className="h-3 w-3" /> Inactive
                </Badge>
            );
        }

        const today = new Date();
        const validTo = new Date(rate.validTo);

        if (validTo < today) {
            return (
                <Badge variant="destructive" className="gap-1 h-6">
                    <AlertCircle className="h-3 w-3" /> Expired
                </Badge>
            );
        }

        const daysToExpiry = Math.ceil(
            (validTo.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        if (daysToExpiry <= 7) {
            return (
                <Badge variant="warning" className="gap-1 h-6">
                    <AlertCircle className="h-3 w-3" /> Expiring Soon
                </Badge>
            );
        }

        return (
            <Badge variant="success" className="gap-1 h-6">
                <CheckCircle2 className="h-3 w-3" /> Active
            </Badge>
        );
    };

    const getCustomerTypeBadge = (type: string) => {
        const config = {
            CUSTOMER: { label: "Customer", color: "bg-blue-100 text-blue-800" },
            AGENT: { label: "Agent", color: "bg-green-100 text-green-800" },
            VENDOR: { label: "Vendor", color: "bg-purple-100 text-purple-800" },
            ALL: { label: "All", color: "bg-gray-100 text-gray-800" },
        };

        const cfg = config[type as keyof typeof config] || config.ALL;
        return (
            <Badge className={`rounded-full ${cfg.color} border-0 h-6`}>
                {cfg.label}
            </Badge>
        );
    };

    const getServiceTypeBadge = (type: string) => {
        const config = {
            SURFACE: { label: "Surface", color: "bg-green-100 text-green-800" },
            AIR: { label: "Air", color: "bg-blue-100 text-blue-800" },
            EXPRESS: { label: "Express", color: "bg-purple-100 text-purple-800" },
            ALL: { label: "All", color: "bg-gray-100 text-gray-800" },
        };

        const cfg = config[type as keyof typeof config] || config.ALL;
        return (
            <Badge
                variant="outline"
                className={`${cfg.color.replace("bg-", "")} h-6`}
            >
                {cfg.label}
            </Badge>
        );
    };

    return (
        <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Rates List
                    <Badge variant="secondary" className="rounded-full">
                        {rates.length} rates
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {rates.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 opacity-50">
                            <Package className="h-8 w-8 text-primary/60" />
                        </div>
                        <p className="text-muted-foreground mb-2">No rate rules found</p>
                        <p className="text-sm text-muted-foreground mb-6">
                            Try adjusting your search criteria or create a new rate rule
                        </p>
                        <Button onClick={onCreate} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Rate Rule
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rates.map((rate) => (
                            <Card
                                key={rate.id}
                                className="group rounded-xl border-border/70 hover:border-primary/50 transition-all duration-300 hover:shadow-card bg-card/95"
                            >
                                <CardContent className="p-0">
                                    {/* Rate Header */}
                                    <div className="p-5 border-b border-border/40">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="rounded-xl bg-primary/10 p-3 shrink-0 group-hover:bg-primary/20 transition-colors">
                                                        <Tag className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3 flex-wrap">
                                                            <h3 className="font-semibold text-lg text-foreground">
                                                                {rate.name}
                                                            </h3>
                                                            {getStatusBadge(rate)}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 items-center">
                                                            {getCustomerTypeBadge(rate.customerType)}
                                                            {getServiceTypeBadge(rate.serviceType)}
                                                            <span className="text-muted-foreground">•</span>
                                                            <Badge variant="outline" className="h-6">
                                                                {rate.paymentMode === "ALL"
                                                                    ? "All Payments"
                                                                    : rate.paymentMode}
                                                            </Badge>
                                                            <span className="hidden lg:inline text-muted-foreground">
                                                                •
                                                            </span>
                                                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                                <Calendar className="h-3.5 w-3.5" />
                                                                <span className="font-medium">
                                                                    {new Date(rate.validFrom).toLocaleDateString(
                                                                        "en-IN"
                                                                    )}
                                                                </span>
                                                                <span>→</span>
                                                                <span className="font-medium">
                                                                    {new Date(rate.validTo).toLocaleDateString(
                                                                        "en-IN"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-9 gap-2 rounded-lg"
                                                    onClick={() => toggleExpand(rate.id)}
                                                >
                                                    {expandedRates.includes(rate.id)
                                                        ? "Hide Details"
                                                        : "View Details"}
                                                </Button>
                                                <div className="h-6 w-px bg-border/60 mx-1"></div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => onShowDetails(rate)}
                                                    title="Quick View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => onEdit(rate)}
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => onDelete(rate.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedRates.includes(rate.id) && (
                                        <div className="p-6 bg-muted/10 animate-in fade-in slide-in-from-top-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {/* Weight Slabs */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-primary">
                                                        <Package className="h-4 w-4" />
                                                        Weight Slab Rates
                                                    </h4>
                                                    <div className="space-y-2 bg-background/60 p-3 rounded-lg border border-border/50">
                                                        {rate.slabs.length > 0 ? (
                                                            rate.slabs.map((slab) => (
                                                                <div
                                                                    key={slab.id}
                                                                    className="flex justify-between text-sm py-1 border-b border-border/30 last:border-0"
                                                                >
                                                                    <span className="text-muted-foreground font-medium">
                                                                        {slab.slabName}
                                                                    </span>
                                                                    <span className="font-semibold text-foreground">
                                                                        ₹{slab.rate}{" "}
                                                                        <span className="text-xs text-muted-foreground font-normal">
                                                                            {slab.rateType === "PER_KG" ? "/kg" : ""}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">
                                                                No slabs defined
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Zone Rates */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-green-600">
                                                        <Map className="h-4 w-4" />
                                                        Zone Matrix
                                                    </h4>
                                                    <div className="space-y-2 bg-background/60 p-3 rounded-lg border border-border/50">
                                                        {rate.zones.length > 0 ? (
                                                            <>
                                                                {rate.zones.slice(0, 3).map((zone) => (
                                                                    <div
                                                                        key={zone.id}
                                                                        className="flex justify-between text-sm py-1 border-b border-border/30 last:border-0"
                                                                    >
                                                                        <span className="text-muted-foreground font-medium truncate max-w-[120px]">
                                                                            {zone.fromZone} → {zone.toZone}
                                                                        </span>
                                                                        <span className="font-semibold text-foreground">
                                                                            ₹{zone.rate}{" "}
                                                                            <span className="text-xs text-muted-foreground font-normal">
                                                                                ({zone.transitDays}d)
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                                {rate.zones.length > 3 && (
                                                                    <div className="text-xs text-center text-primary font-medium pt-1 cursor-pointer hover:underline">
                                                                        +{rate.zones.length - 3} more zones
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">
                                                                No zones defined
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Charges */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-purple-600">
                                                        <Percent className="h-4 w-4" />
                                                        Additional Charges
                                                    </h4>
                                                    <div className="space-y-2 bg-background/60 p-3 rounded-lg border border-border/50">
                                                        <div className="flex justify-between text-sm py-1 border-b border-border/30">
                                                            <span className="text-muted-foreground font-medium">
                                                                Fuel Surcharge
                                                            </span>
                                                            <span className="font-semibold">
                                                                {rate.fuelSurcharge.percentage}%
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm py-1 border-b border-border/30">
                                                            <span className="text-muted-foreground font-medium">
                                                                FOV Charge
                                                            </span>
                                                            <span className="font-semibold">
                                                                {rate.fovCharge.percentage}%
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm py-1 border-b border-border/30">
                                                            <span className="text-muted-foreground font-medium">
                                                                COD Charges
                                                            </span>
                                                            <span className="font-semibold">
                                                                {rate.codCharges.percentage}%
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm py-1">
                                                            <span className="text-muted-foreground font-medium">
                                                                Min. Charge
                                                            </span>
                                                            <span className="font-semibold">
                                                                ₹{rate.minCharge.amount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Info Grid */}
                                            {rate.additionalCharges.length > 0 && (
                                                <div className="mt-6 pt-4 border-t border-border/40">
                                                    <h4 className="font-medium text-sm mb-3">
                                                        Other Charges
                                                    </h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {rate.additionalCharges.map((charge) => (
                                                            <Badge
                                                                key={charge.id}
                                                                variant="outline"
                                                                className="pl-2 pr-3 py-1.5 h-auto text-sm gap-2"
                                                            >
                                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/60"></div>
                                                                {charge.name}:{" "}
                                                                <span className="font-semibold ml-1">
                                                                    {charge.type === "FIXED" ? "₹" : ""}
                                                                    {charge.value}
                                                                    {charge.type === "PERCENTAGE" ? "%" : ""}
                                                                </span>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RatesList;
