"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsCards from "./StatisticsCards";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import ProcessingModal from "./ProcessingModal";
import { inwardShipmentsData, inwardStats } from "./data/mockData";
import { ManifestTable } from "../../shared/ManifestTable";
import { ExportDialog } from "@/components/drs/shared/ActionDialogs";

import BulkUploadModal from "../(bulk)/BulkUploadModal";

const InwardProcessing = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState(
    inwardShipmentsData[0]
  );
  const [processingNotes, setProcessingNotes] = useState("");
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const filteredShipments = inwardShipmentsData.filter((shipment) => {
    const matchesSearch =
      shipment.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver.phone.includes(searchTerm) ||
      shipment.origin.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || shipment.priority === priorityFilter;
    const matchesOrigin =
      originFilter === "all" || shipment.origin.type === originFilter;
    const matchesTab = activeTab === "all" || shipment.status === activeTab;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesOrigin &&
      matchesTab
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection
        onExport={() => setShowExportDialog(true)}
        onNewEntry={() => setShowProcessingModal(true)}
      />
      <StatisticsCards stats={inwardStats} />
      <QuickActions
        onBulkUpload={() => setShowBulkUploadModal(true)}
        onBatchScan={() => console.log("Batch Scan")}
        onBulkWeigh={() => console.log("Bulk Weigh")}
        onAutoAssign={() => console.log("Auto Assign")}
      />

      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        originFilter={originFilter}
        setOriginFilter={setOriginFilter}
      />

      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shipmentsData={inwardShipmentsData}
      />

      <div className="space-y-6">
        <ManifestTable
          data={filteredShipments.map(s => ({
            ...s,
            awb: s.awbNumber,
            customer: s.receiver.name,
            phone: s.receiver.phone,
            weight: s.package?.weight || 0,
            location: s.origin.name,
            type: s.priority
          }))}
          title="Inward Shipments"
        />
      </div>

      {showProcessingModal && (
        <ProcessingModal
          selectedShipment={selectedShipment}
          showProcessingModal={showProcessingModal}
          setShowProcessingModal={setShowProcessingModal}
        />
      )}

      {showBulkUploadModal && (
        <BulkUploadModal onClose={() => setShowBulkUploadModal(false)} />
      )}

      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        onExport={(format) => {
          console.log(`Exporting as ${format}`);
          setShowExportDialog(false);
        }}
      />
    </div>
  );
};

export default InwardProcessing;
