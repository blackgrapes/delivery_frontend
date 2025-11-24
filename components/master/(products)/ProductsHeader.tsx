// components/master/products/ProductsHeader.tsx
import { Package, Plus, Download, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductsHeaderProps {
  onAddProduct: () => void;
  onBulkUpload: () => void;
  productCount: number;
}

const ProductsHeader = ({
  onAddProduct,
  onBulkUpload,
  productCount,
}: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Products Management
            </h1>
            <p className="text-muted-foreground">
              Manage product catalog, specifications, and handling requirements
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 rounded-xl border-border/70">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-border/70"
          onClick={onBulkUpload}
        >
          <Upload className="h-4 w-4" />
          Bulk Upload
        </Button>
        <Button
          className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-brand"
          onClick={onAddProduct}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductsHeader;
