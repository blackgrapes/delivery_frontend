import { DRSTable } from "../shared/DRSTable";

interface DRSContentProps {
  filteredDRS: any[];
  selectedDRS: any;
  setSelectedDRS: (drs: any) => void;
}

const DRSContent = ({
  filteredDRS,
  selectedDRS,
  setSelectedDRS,
}: DRSContentProps) => {
  return (
    <div className="space-y-6">
      <DRSTable data={filteredDRS} title="Active DRS List" />
    </div>
  );
};

export default DRSContent;
