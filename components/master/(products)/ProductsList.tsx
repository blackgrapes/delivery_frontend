// components/master/products/ProductsList.tsx
import {
  Edit,
  Trash2,
  Package,
  Weight,
  Ruler,
  IndianRupee,
  ShieldAlert,
  AlertTriangle,
  Thermometer,
  Play,
  Pause,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "./types";

interface ProductsListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleStatus: (productId: string) => void;
}

const ProductsList = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onToggleStatus,
}: ProductsListProps) => {
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
          <Package className="h-5 w-5 text-primary" />
          Products List
          <Badge variant="secondary" className="rounded-full">
            {products.length} products
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="rounded-xl border-border/70">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                              {product.sku}
                            </code>
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              {product.category}
                            </Badge>
                            <Badge
                              variant={getStatusColor(product.status) as any}
                              className="rounded-full text-xs flex items-center gap-1"
                            >
                              {getStatusIcon(product.status)}
                              {product.status.toUpperCase()}
                            </Badge>
                            {product.fragile && (
                              <Badge
                                variant="warning"
                                className="rounded-full text-xs flex items-center gap-1"
                              >
                                <ShieldAlert className="h-3 w-3" />
                                FRAGILE
                              </Badge>
                            )}
                            {product.hazardous && (
                              <Badge
                                variant="error"
                                className="rounded-full text-xs flex items-center gap-1"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                HAZARDOUS
                              </Badge>
                            )}
                            {product.temperatureSensitive && (
                              <Badge
                                variant="info"
                                className="rounded-full text-xs flex items-center gap-1"
                              >
                                <Thermometer className="h-3 w-3" />
                                TEMP SENSITIVE
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Weight className="h-4 w-4 text-muted-foreground" />
                            <span>{product.weight} kg</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ruler className="h-4 w-4 text-muted-foreground" />
                            <span>{product.dimensions}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>{product.value.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">HSN:</span>
                            <span className="font-mono">{product.hsnCode}</span>
                          </div>
                        </div>

                        {product.subCategory && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Sub-category:{" "}
                            </span>
                            <span className="font-medium">
                              {product.subCategory}
                            </span>
                          </div>
                        )}

                        {(product.specialHandling ||
                          product.storageRequirements) && (
                          <div className="space-y-1">
                            {product.specialHandling && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Handling:{" "}
                                </span>
                                <span className="font-medium">
                                  {product.specialHandling}
                                </span>
                              </div>
                            )}
                            {product.storageRequirements && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Storage:{" "}
                                </span>
                                <span className="font-medium">
                                  {product.storageRequirements}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>
                          Created:{" "}
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          Updated:{" "}
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg"
                      onClick={() => onEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-2 rounded-lg ${
                        product.status === "active"
                          ? "text-orange-600 border-orange-500 hover:bg-orange-50"
                          : "text-green-600 border-green-500 hover:bg-green-50"
                      }`}
                      onClick={() => onToggleStatus(product.id)}
                    >
                      {product.status === "active" ? (
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
                      className="gap-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/30">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new product
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsList;
