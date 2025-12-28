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
    Calendar,
    MapPin,
    Package,
    Scale,
    AlertCircle
} from "lucide-react";

interface ManifestTableProps {
    data: any[];
    title?: string;
}

export const ManifestTable = ({ data, title = "Manifest List" }: ManifestTableProps) => {
    return (
        <Card className="rounded-3xl border-border/70 bg-card/95 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base font-semibold text-foreground">
                        {title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        View and manage manifest records
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">AWB / ID</TableHead>
                            <TableHead>Customer / Receiver</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Location / Route</TableHead>
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
                            data.map((item, i) => (
                                <TableRow key={item.id || item.awb || i} className="group hover:bg-muted/20">
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                                <Package className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {item.awb || item.id}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.type || "Standard"}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="text-sm font-medium text-foreground">{item.customer || item.receiver || "Unknown"}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 text-sm">
                                                {item.weight && (
                                                    <span className="flex items-center gap-1 text-muted-foreground">
                                                        <Scale className="h-3 w-3" />
                                                        {item.weight} kg
                                                    </span>
                                                )}
                                                {item.amount && (
                                                    <span className="font-medium text-foreground">
                                                        ₹{item.amount}
                                                    </span>
                                                )}
                                                {item.count && (
                                                    <span className="flex items-center gap-1 text-muted-foreground">
                                                        <Package className="h-3 w-3" />
                                                        {item.count} items
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                item.status === "completed" || item.status === "processed" || item.status === "active"
                                                    ? "success"
                                                    : item.status === "pending" || item.status === "draft"
                                                        ? "warning"
                                                        : item.status === "rejected" || item.status === "failed"
                                                            ? "destructive"
                                                            : "secondary"
                                            }
                                            className="rounded-full capitalize"
                                        >
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {item.location ? (
                                                <>
                                                    <MapPin className="h-3 w-3" />
                                                    {item.location}
                                                </>
                                            ) : (
                                                <>
                                                    <Calendar className="h-3 w-3" />
                                                    {item.date || new Date().toLocaleDateString()}
                                                </>
                                            )}
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
                                                        Download Receipt
                                                    </DropdownMenuItem>
                                                    {item.status === "pending" && (
                                                        <DropdownMenuItem className="flex items-center gap-2 rounded-lg text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            Report Issue
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
