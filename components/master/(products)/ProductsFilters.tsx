// components/master/products/ProductsFilters.tsx
import { Search, Filter, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "./types";

interface ProductsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  hazardousFilter: string;
  onHazardousFilterChange: (value: string) => void;
  products: Product[];
}

const ProductsFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  hazardousFilter,
  onHazardousFilterChange,
  products,
}: ProductsFiltersProps) => {
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();

  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, description, HSN code..."
                className="pl-10 rounded-xl"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={onCategoryFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={hazardousFilter}
                onValueChange={onHazardousFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  <SelectValue placeholder="Hazardous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hazardous">Hazardous</SelectItem>
                  <SelectItem value="non_hazardous">Non-Hazardous</SelectItem>
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
  );
};

export default ProductsFilters;
