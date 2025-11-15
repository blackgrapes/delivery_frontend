"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsCards from "./StatisticsCards";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import ShipmentsList from "./ShipmentsList";
import ShipmentDetails from "./ShipmentDetails";
import ProcessingModal from "./ProcessingModal";
import { inwardShipmentsData, inwardStats } from "./data/mockData";

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
      <HeaderSection />
      <StatisticsCards stats={inwardStats} />
      <QuickActions />

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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ShipmentsList
          shipments={filteredShipments}
          selectedShipment={selectedShipment}
          setSelectedShipment={setSelectedShipment}
        />

        <ShipmentDetails
          selectedShipment={selectedShipment}
          processingNotes={processingNotes}
          setProcessingNotes={setProcessingNotes}
          setShowProcessingModal={setShowProcessingModal}
        />
      </div>

      {showProcessingModal && (
        <ProcessingModal
          selectedShipment={selectedShipment}
          showProcessingModal={showProcessingModal}
          setShowProcessingModal={setShowProcessingModal}
        />
      )}
    </div>
  );
};

export default InwardProcessing;
