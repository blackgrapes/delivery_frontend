// components/master/pincodes/PincodesFilters.tsx
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
import { Pincode } from "./types";

interface PincodesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (value: string) => void;
  stateFilter: string;
  onStateFilterChange: (value: string) => void;
  pincodes: Pincode[];
}

const PincodesFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  serviceFilter,
  onServiceFilterChange,
  stateFilter,
  onStateFilterChange,
  pincodes,
}: PincodesFiltersProps) => {
  const states = Array.from(new Set(pincodes.map((p) => p.state))).sort();

  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardContent className="p-4 sm:p-6">
        {" "}
        {/* Padding adjusted slightly for smaller screens */}
        <div className="flex flex-col gap-4">
          {/* Search Bar Section */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by pincode, city, state, district..."
              className="pl-10 rounded-xl w-full"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Filters and Refresh Button Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Filters Group (Status, Service, State) */}
            {/* This will wrap on medium screens and become columns on small screens */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  {" "}
                  {/* Added sm:w-40 for better alignment on medium screens, w-full for small screens */}
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={serviceFilter}
                onValueChange={onServiceFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Service</SelectItem>
                  <SelectItem value="same_day">Same Day</SelectItem>
                  <SelectItem value="next_day">Next Day</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="non_serviceable">
                    Non-Serviceable
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={stateFilter} onValueChange={onStateFilterChange}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70 w-full md:w-auto mt-1 md:mt-0" // w-full on small screens
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

export default PincodesFilters;
