import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchHeader } from "./BranchHeader";
import { BranchTable } from "./BranchTable";
import { SearchFilters } from "./SearchFilters";
import { StatsGrid } from "./StatsGrid";
import { ActionsPanel } from "./ActionsPanel";
import BranchPerformance from "../(performance)/BranchPerformance";

const BranchList = () => {
  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="all-branches" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="all-branches"
              className="rounded-lg px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              All Branches
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="rounded-lg px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Branch Performance
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all-branches" className="space-y-7 focus-visible:outline-none focus-visible:ring-0">
          <BranchHeader />
          <StatsGrid />
          <SearchFilters />
          <BranchTable />
          <ActionsPanel />
        </TabsContent>

        <TabsContent value="performance" className="focus-visible:outline-none focus-visible:ring-0">
          <BranchPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchList;
