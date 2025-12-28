import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Eye,
    MapPin,
    Package,
    Navigation,
    Trash2
} from "lucide-react";
import PriorityBadge from "../(create)/PriorityBadge";

interface ShipmentTableProps {
    shipments: any[];
    selectedShipments?: any[];
    onToggleShipment?: (shipment: any) => void;
    title: string;
    description?: string;
    isSelectionMode?: boolean;
}

export const ShipmentTable = ({
    shipments,
    selectedShipments = [],
    onToggleShipment,
    title,
    description,
    isSelectionMode = false
}: ShipmentTableProps) => {

    const isSelected = (awb: string) => {
        return selectedShipments.some(s => s.awbNumber === awb);
    };

    return (
        <Card className="rounded-3xl border-border/70 bg-card/95 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                        {title}
                        <Badge variant="secondary" className="rounded-full">
                            {shipments.length}
                        </Badge>
                    </CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {isSelectionMode && <TableHead className="w-[50px]">Select</TableHead>}
                            <TableHead>AWB / Service</TableHead>
                            <TableHead>Receiver Details</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Package Info</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shipments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Package className="h-8 w-8 opacity-20" />
                                        <p>No shipments available</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            shipments.map((shipment) => (
                                <TableRow key={shipment.awbNumber} className="group hover:bg-muted/20">
                                    {isSelectionMode && (
                                        <TableCell>
                                            <Switch
                                                checked={isSelected(shipment.awbNumber)}
                                                onCheckedChange={() => onToggleShipment && onToggleShipment(shipment)}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-mono font-semibold text-foreground">
                                                {shipment.awbNumber}
                                            </div>
                                            <Badge variant="outline" className="text-[10px] h-5">
                                                {shipment.service?.type || "Standard"}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium text-foreground">{shipment.receiver?.name}</div>
                                            <div className="text-xs text-muted-foreground">{shipment.receiver?.phone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-start gap-1 max-w-[200px]">
                                            <MapPin className="h-3 w-3 mt-1 text-muted-foreground shrink-0" />
                                            <span className="text-sm text-muted-foreground truncate">
                                                {shipment.receiver?.city} - {shipment.receiver?.pincode}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-green-600">
                                                {shipment.package?.codAmount}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {shipment.package?.weight}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <PriorityBadge priority={shipment.priority} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-lg"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                    <DropdownMenuItem className="flex items-center gap-2 rounded-lg">
                                                        <Eye className="h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-2 rounded-lg">
                                                        <Navigation className="h-4 w-4" />
                                                        Show on Map
                                                    </DropdownMenuItem>
                                                    {isSelectionMode && isSelected(shipment.awbNumber) && (
                                                        <DropdownMenuItem className="flex items-center gap-2 rounded-lg text-red-600" onClick={() => onToggleShipment && onToggleShipment(shipment)}>
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
