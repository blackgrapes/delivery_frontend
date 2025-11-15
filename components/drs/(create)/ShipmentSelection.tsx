import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Filter,
  RefreshCw,
  Package,
  Truck,
  MoreHorizontal,
  MapPin,
  QrCode,
  Navigation,
  Eye,
  Trash2,
} from "lucide-react";
import PriorityBadge from "./PriorityBadge";

interface ShipmentSelectionProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedShipments: any[];
  onToggleShipment: (shipment: any) => void;
  filteredShipments: any[];
}

const ShipmentSelection = ({
  searchTerm,
  onSearchTermChange,
  selectedShipments,
  onToggleShipment,
  filteredShipments,
}: ShipmentSelectionProps) => {
  return (
    <>
      {/* Search and Filters */}
      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by AWB, receiver, phone, city..."
                  className="pl-10 rounded-xl w-full"
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                />
              </div>

              <div className="flex gap-2 flex-1 lg:flex-none">
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1 lg:w-40 rounded-xl">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="flex-1 lg:w-40 rounded-xl">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Service</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="surface">Surface</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-border/70 flex-1 lg:flex-none"
              >
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-border/70 flex-1 lg:flex-none"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Shipments */}
      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Selected Shipments
            <Badge variant="secondary" className="rounded-full">
              {selectedShipments.length} shipments
            </Badge>
          </CardTitle>
          <CardDescription>
            Shipments assigned to this delivery run
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedShipments.map((shipment, index) => (
              <Card
                key={shipment.awbNumber}
                className="rounded-xl border-border/70"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-mono font-semibold text-foreground">
                            {shipment.awbNumber}
                          </p>
                          <QrCode className="h-3 w-3 text-muted-foreground" />
                          <PriorityBadge priority={shipment.priority} />
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {shipment.receiver.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {shipment.receiver.phone}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {shipment.receiver.address},{" "}
                              {shipment.receiver.city} -{" "}
                              {shipment.receiver.pincode}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Package:{" "}
                              </span>
                              <span className="font-medium">
                                {shipment.package.description}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                COD:{" "}
                              </span>
                              <span className="font-medium text-green-600">
                                {shipment.package.codAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
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
                        <DropdownMenuItem className="flex items-center gap-2 rounded-lg text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}

            {selectedShipments.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">
                  No shipments selected
                </p>
                <p className="text-sm text-muted-foreground">
                  Select shipments from the available list to create a delivery
                  run
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Shipments */}
      <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Available Shipments
            <Badge variant="secondary" className="rounded-full">
              {filteredShipments.length} available
            </Badge>
          </CardTitle>
          <CardDescription>
            Ready-to-deliver shipments for assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredShipments.map((shipment) => {
              const isSelected = selectedShipments.find(
                (s) => s.awbNumber === shipment.awbNumber
              );

              return (
                <Card
                  key={shipment.awbNumber}
                  className={`cursor-pointer transition-all border-2 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border/70 hover:border-primary/50"
                  } rounded-xl`}
                  onClick={() => onToggleShipment(shipment)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <Switch checked={isSelected} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-mono font-semibold text-foreground">
                              {shipment.awbNumber}
                            </p>
                            <QrCode className="h-3 w-3 text-muted-foreground" />
                            <PriorityBadge priority={shipment.priority} />
                          </div>

                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {shipment.receiver.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {shipment.receiver.phone}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {shipment.receiver.city} -{" "}
                                {shipment.receiver.pincode}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Service:{" "}
                                </span>
                                <span className="font-medium">
                                  {shipment.service.type}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  COD:{" "}
                                </span>
                                <span className="font-medium text-green-600">
                                  {shipment.package.codAmount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full text-xs"
                        >
                          {shipment.package.weight}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(
                            shipment.timeline.expectedDelivery
                          ).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredShipments.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No shipments found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ShipmentSelection;
