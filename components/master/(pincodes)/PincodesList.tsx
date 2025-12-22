// components/master/pincodes/PincodesList.tsx
import {
  Edit,
  Trash2,
  MapPin,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  BadgeCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pincode } from "./types";

interface PincodesListProps {
  pincodes: Pincode[];
  onEditPincode: (pincode: Pincode) => void;
  onDeletePincode: (pincodeId: string) => void;
  onToggleStatus: (pincodeId: string) => void;
}

const PincodesList = ({
  pincodes,
  onEditPincode,
  onDeletePincode,
  onToggleStatus,
}: PincodesListProps) => {
  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <BadgeCheck className="h-3 w-3" />
    ) : (
      <XCircle className="h-3 w-3" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "secondary";
  };

  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Pincodes List
          <Badge variant="secondary" className="rounded-full">
            {pincodes.length} pincodes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pincodes.map((pincode) => (
            <Card key={pincode.id} className="rounded-xl border-border/70">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg">
                            {pincode.pincode}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-sm text-muted-foreground">
                              {pincode.city}, {pincode.district},{" "}
                              {pincode.state}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getStatusColor(pincode.status) as any}
                            className="rounded-full text-xs flex items-center gap-1"
                          >
                            {getStatusIcon(pincode.status)}
                            {pincode.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Country:{" "}
                          </span>
                          <span className="font-medium">{pincode.country}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Zone:{" "}
                          </span>
                          <span className="font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                            {pincode.zone || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Status:{" "}
                          </span>
                          <span className="font-medium capitalize">
                            {pincode.status}
                          </span>
                        </div>
                        {pincode.specialInstructions && (
                          <div className="sm:col-span-2 lg:col-span-3">
                            <span className="text-muted-foreground">
                              Instructions:{" "}
                            </span>
                            <span className="font-medium">
                              {pincode.specialInstructions}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>
                          Created:{" "}
                          {new Date(pincode.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          Updated:{" "}
                          {new Date(pincode.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg flex-1 lg:flex-none"
                      onClick={() => onEditPincode(pincode)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-2 rounded-lg flex-1 lg:flex-none ${pincode.status === "active"
                          ? "text-orange-600 border-orange-500 hover:bg-orange-50"
                          : "text-green-600 border-green-500 hover:bg-green-50"
                        }`}
                      onClick={() => onToggleStatus(pincode.id)}
                    >
                      {pincode.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 lg:flex-none"
                      onClick={() => onDeletePincode(pincode.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pincodes.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No pincodes found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new pincode
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PincodesList;
