import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    FileText,
    AlertCircle,
    User,
    Calendar,
    MapPin,
    Truck,
    Package
} from "lucide-react";

interface DRSTableProps {
    data: any[];
    title?: string;
}

export const DRSTable = ({ data, title = "DRS List" }: DRSTableProps) => {
    return (
        <Card className="rounded-3xl border-border/70 bg-card/95 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base font-semibold text-foreground">
                        {title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Manage and view detailed records
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">DRS No</TableHead>
                            <TableHead>Rider Info</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((drs, i) => (
                                <TableRow key={drs.id || drs.drsNumber || i} className="group hover:bg-muted/20">
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                                <Truck className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {drs.drsNumber || drs.id}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {typeof drs.route === 'object' && drs.route !== null ? drs.route.totalDistance : drs.route || "Local Route"}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm font-medium text-foreground">{drs.rider?.name || "Unassigned"}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {drs.rider?.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-muted-foreground">
                                                    <Package className="h-3 w-3" />
                                                    {drs.stats?.totalShipments || 0}
                                                </span>
                                                <span className="font-medium text-foreground">
                                                    ₹{drs.stats?.totalCOD || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                drs.status === "completed" || drs.status === "active"
                                                    ? "success"
                                                    : drs.status === "pending" || drs.status === "draft"
                                                        ? "warning"
                                                        : "secondary"
                                            }
                                            className="rounded-full capitalize"
                                        >
                                            {drs.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {drs.date || new Date().toLocaleDateString()}
                                        </div>
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
                                                        <FileText className="h-4 w-4" />
                                                        Download PDF
                                                    </DropdownMenuItem>
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
