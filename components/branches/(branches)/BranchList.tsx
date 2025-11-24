import { BranchHeader } from "./BranchHeader";
import { BranchTable } from "./BranchTable";
import { SearchFilters } from "./SearchFilters";
import { StatsGrid } from "./StatsGrid";
import { ActionsPanel } from "./ActionsPanel";

const BranchList = () => {
  return (
    <div className="space-y-7 p-6">
      <BranchHeader />
      <StatsGrid />
      <SearchFilters />
      <BranchTable />
      <ActionsPanel />
    </div>
  );
};

export default BranchList;
