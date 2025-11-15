import DRSList from "./DRSList";
import DRSDetails from "./DRSDetails";

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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <DRSList
        filteredDRS={filteredDRS}
        selectedDRS={selectedDRS}
        setSelectedDRS={setSelectedDRS}
      />
      <DRSDetails selectedDRS={selectedDRS} />
    </div>
  );
};

export default DRSContent;
