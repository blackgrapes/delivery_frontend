
import {
  Edit,
  Trash2,
  MoreHorizontal,
  MapPin,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowUpFromLine,
  Coins,
  AlertTriangle,
  Building2,
  Store,
  CheckSquare,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Pincode } from "./types";

interface PincodesListProps {
  pincodes: Pincode[];
  selectedIds: string[];
  onSelectId: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onEditPincode: (pincode: Pincode) => void;
  onDeletePincode: (pincodeId: string) => void;
  onToggleStatus: (pincodeId: string) => void;
  onBulkDelete: () => void;
}

const PincodesList = ({
  pincodes,
  selectedIds,
  onSelectId,
  onSelectAll,
  onEditPincode,
  onDeletePincode,
  onToggleStatus,
  onBulkDelete
}: PincodesListProps) => {

  const getServiceabilityBadge = (serviceability: string) => {
    const styles = {
      same_day: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
      express: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100",
      standard: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
      non_serviceable: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
    };
    const style = styles[serviceability as keyof typeof styles] || styles.standard;
    return (
      <Badge variant="outline" className={`capitalize ${style} rounded-md shadow-none`}>
        {serviceability.replace("_", " ")}
      </Badge>
    );
  };

  const allSelected = pincodes.length > 0 && selectedIds.length === pincodes.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < pincodes.length;

  const handleSelectAllClick = () => {
    if (allSelected) {
      onSelectAll([]);
    } else {
      onSelectAll(pincodes.map(p => p.id));
    }
  };

  if (pincodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-border/60 bg-card/50 border-dashed">
        <div className="p-4 rounded-full bg-muted/50 mb-4">
          <MapPin className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No pincodes found</h3>
        <p className="text-muted-foreground max-w-sm mt-1">
          Try adjusting your search filters or add a new serviceable area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border/60 bg-card/95 shadow-sm overflow-hidden relative">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent border-border/60">
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={allSelected || isIndeterminate}
                  onCheckedChange={handleSelectAllClick}
                />
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-muted-foreground">Pincode</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Location</TableHead>
              <TableHead className="w-[120px] font-semibold text-muted-foreground">Service Mode</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Service Type</TableHead>
              <TableHead className="text-center font-semibold text-muted-foreground">Attributes</TableHead>
              <TableHead className="w-[100px] font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="w-[60px] text-right font-semibold text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pincodes.map((pincode) => (
              <TableRow key={pincode.id} className="group hover:bg-muted/30 border-border/50">
                <TableCell className="pl-4">
                  <Checkbox
                    checked={selectedIds.includes(pincode.id)}
                    onCheckedChange={() => onSelectId(pincode.id)}
                  />
                </TableCell>
                <TableCell className="font-medium font-mono text-base text-foreground">
                  <div className="flex flex-col gap-1">
                    <span>{pincode.pincode}</span>
                    {pincode.isODA && (
                      <Badge variant="destructive" className="w-fit text-[10px] px-1 h-5 bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                        ODA Area
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{pincode.city}</span>
                    <span className="text-xs text-muted-foreground">
                      {pincode.district}, {pincode.state}
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 mt-0.5">
                      Zone: {pincode.zone}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {pincode.serviceCategory === 'SELF' && <Building2 className="h-3.5 w-3.5 text-primary" />}
                      {pincode.serviceCategory === 'PARTNER' && <Store className="h-3.5 w-3.5 text-orange-600" />}
                      {pincode.serviceCategory === 'FRANCHISE' && <Store className="h-3.5 w-3.5 text-purple-600" />}
                      <span className="capitalize text-xs">{pincode.serviceCategory}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[100px]" title={pincode.lastMilePartner}>
                      {pincode.lastMilePartner}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 items-start">
                    {getServiceabilityBadge(pincode.serviceability)}
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground pl-1" title="Last Mile TAT (Hub to Customer)">
                      <Clock className="h-3 w-3" />
                      <span>{pincode.deliveryTime}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`p-1.5 rounded-md ${pincode.codAvailable ? 'bg-blue-50 text-blue-600' : 'bg-muted text-muted-foreground/30'}`}>
                            <Coins className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          {pincode.codAvailable ? (
                            pincode.maxCodAmount ? `COD up to ₹${pincode.maxCodAmount}` : "COD Available"
                          ) : "Prepaid Only"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`p-1.5 rounded-md ${pincode.pickupAvailable ? 'bg-indigo-50 text-indigo-600' : 'bg-muted text-muted-foreground/30'}`}>
                            <ArrowUpFromLine className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          {pincode.pickupAvailable ? "Pickup Supported" : "Delivery Only"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {pincode.embargoTags && pincode.embargoTags.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-1.5 rounded-md bg-red-50 text-red-600">
                              <AlertTriangle className="h-4 w-4" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs text-xs">
                            Restricted: {pincode.embargoTags.join(", ")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${pincode.status === 'active'
                      ? 'bg-green-500/15 text-green-700 hover:bg-green-500/25 border-transparent'
                      : 'bg-red-500/15 text-red-700 hover:bg-red-500/25 border-transparent'
                      }`}
                  >
                    {pincode.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] rounded-xl">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEditPincode(pincode)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleStatus(pincode.id)}>
                        {pincode.status === 'active' ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4 text-orange-600" /> Deactivate
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" /> Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeletePincode(pincode.id)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Area
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex items-center gap-3 border-r border-background/20 pr-6">
            <div className="bg-background text-foreground text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
              {selectedIds.length}
            </div>
            <span className="text-sm font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-background/20 hover:text-white rounded-full h-8 text-xs gap-2">
              <Building2 className="h-3.5 w-3.5" />
              Assign Branch
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-background/20 hover:text-white rounded-full h-8 text-xs gap-2">
              <CheckSquare className="h-3.5 w-3.5" />
              Update Status
            </Button>
            <div className="h-4 w-[1px] bg-background/20 mx-1"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkDelete}
              className="hover:bg-red-500/20 hover:text-red-400 text-red-400 rounded-full h-8 text-xs gap-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PincodesList;
