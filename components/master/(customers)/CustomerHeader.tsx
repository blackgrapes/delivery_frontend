// components/master/customers/CustomerHeader.tsx
import { Users, Plus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CustomerHeaderProps {
  onAddCustomer: () => void;
  customerCount: number;
}

const CustomerHeader = ({
  onAddCustomer,
  customerCount,
}: CustomerHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Customer Management
            </h1>
            <p className="text-muted-foreground">
              Manage customer accounts, profiles, and billing information
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
          className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-brand"
          onClick={onAddCustomer}
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>
    </div>
  );
};

export default CustomerHeader;
