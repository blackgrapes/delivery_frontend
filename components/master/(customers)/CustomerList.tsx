// components/master/customers/CustomerList.tsx
import {
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Building,
  BadgeCheck,
  XCircle,
  Users,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Customer } from "./types";

interface CustomerListProps {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
}

const CustomerList = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
}: CustomerListProps) => {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Customer List
          <Badge variant="secondary" className="rounded-full">
            {customers.length} customers
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="rounded-xl border-border/70">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Building className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {customer.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                              {customer.code}
                            </code>
                            {customer.gstin && (
                              <Badge
                                variant="outline"
                                className="rounded-full text-xs"
                              >
                                GST: {customer.gstin}
                              </Badge>
                            )}
                            <Badge
                              variant={
                                customer.status === "active"
                                  ? "success"
                                  : "secondary"
                              }
                              className="rounded-full text-xs"
                            >
                              {customer.status === "active" ? (
                                <BadgeCheck className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {customer.status}
                            </Badge>
                            {customer.isInterStateDealer && (
                              <Badge
                                variant="info"
                                className="rounded-full text-xs"
                              >
                                Inter-State
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {customer.address1}, {customer.city} -{" "}
                              {customer.pincode}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{customer.mobileNo}</span>
                            {customer.phoneO && (
                              <span>• O: {customer.phoneO}</span>
                            )}
                            {customer.phoneR && (
                              <span>• R: {customer.phoneR}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-muted-foreground">
                              Contact:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.contactPerson}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Category:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.category}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Payment:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.paymentMode}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Receivers Section */}
                      {customer.hasReceiver &&
                        customer.receivers &&
                        customer.receivers.length > 0 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Receivers ({customer.receivers.length})
                              </span>
                            </div>
                            <div className="space-y-2">
                              {customer.receivers
                                .slice(0, 2)
                                .map((receiver, index) => (
                                  <div
                                    key={receiver.id}
                                    className="text-xs text-blue-700"
                                  >
                                    <div className="font-medium">
                                      {receiver.name}
                                    </div>
                                    <div>
                                      {receiver.address}, {receiver.city} -{" "}
                                      {receiver.pincode}
                                    </div>
                                    <div>{receiver.mobileNo}</div>
                                  </div>
                                ))}
                              {customer.receivers.length > 2 && (
                                <div className="text-xs text-blue-600">
                                  +{customer.receivers.length - 2} more
                                  receivers
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Pickup Locations Section */}
                      {customer.usePickupLocation &&
                        customer.pickupLocations &&
                        customer.pickupLocations.length > 0 && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Truck className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Pickup Locations (
                                {customer.pickupLocations.length})
                              </span>
                            </div>
                            <div className="space-y-2">
                              {customer.pickupLocations
                                .slice(0, 2)
                                .map((location, index) => (
                                  <div
                                    key={location.id}
                                    className="text-xs text-green-700"
                                  >
                                    <div className="font-medium">
                                      {location.name}
                                    </div>
                                    <div>
                                      {location.address}, {location.city} -{" "}
                                      {location.pincode}
                                    </div>
                                    <div>
                                      Contact: {location.contactPerson} (
                                      {location.mobileNo})
                                    </div>
                                  </div>
                                ))}
                              {customer.pickupLocations.length > 2 && (
                                <div className="text-xs text-green-600">
                                  +{customer.pickupLocations.length - 2} more
                                  locations
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Booked by: {customer.bookedBy}</span>
                        <span>•</span>
                        <span>Station: {customer.station}</span>
                        <span>•</span>
                        <span>Quotation: {customer.quotationType}</span>
                        {customer.hasReceiver && (
                          <>
                            <span>•</span>
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              Has Receiver
                            </Badge>
                          </>
                        )}
                        {customer.usePickupLocation && (
                          <>
                            <span>•</span>
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              Pickup Location
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg"
                      onClick={() => onEditCustomer(customer)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeleteCustomer(customer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {customers.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
              <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No customers found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new customer
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerList;
