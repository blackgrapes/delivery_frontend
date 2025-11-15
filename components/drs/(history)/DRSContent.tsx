import DRSList from "./DRSList";
import DRSDetails from "./DRSDetails";
import { DRSData } from "./types/drs"; // Common type import karein

interface PerformanceStats {
  averageEfficiency: number;
  onTimeDelivery: number;
  customerSatisfaction: number;
}

interface DRSContentProps {
  filteredDRS: DRSData[];
  selectedDRS: DRSData;
  setSelectedDRS: (drs: DRSData) => void;
  performanceStats: PerformanceStats;
}

const DRSContent = ({
  filteredDRS,
  selectedDRS,
  setSelectedDRS,
  performanceStats,
}: DRSContentProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <DRSList
        filteredDRS={filteredDRS}
        selectedDRS={selectedDRS}
        setSelectedDRS={setSelectedDRS}
      />
      <DRSDetails
        selectedDRS={selectedDRS}
        performanceStats={performanceStats}
      />
    </div>
  );
};

export default DRSContent;
