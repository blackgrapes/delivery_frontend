// components/master/products/ProductsStats.tsx
import {
  Package,
  AlertTriangle,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "./types";

interface ProductsStatsProps {
  products: Product[];
}

const ProductsStats = ({ products }: ProductsStatsProps) => {
  const activeProducts = products.filter((p) => p.status === "active").length;
  const fragileProducts = products.filter((p) => p.fragile).length;
  const hazardousProducts = products.filter((p) => p.hazardous).length;
  const temperatureSensitive = products.filter(
    (p) => p.temperatureSensitive
  ).length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {products.length}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Catalog
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Products in catalog
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Active Products
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {activeProducts}
                </span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently available
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Fragile Items
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {fragileProducts}
                </span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Handle Care
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Require special handling
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <ShieldAlert className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Hazardous Goods
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {hazardousProducts}
                </span>
                <Badge variant="error" className="rounded-full text-xs">
                  Danger
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Special restrictions apply
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsStats;
