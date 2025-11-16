// app/dashboard/manifest/forwarding/create/components/ForwardingCreate.tsx
"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsSection from "./StatisticsSection";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import MainContent from "./MainContent";
import { forwardingData, forwardingStats } from "./data/mockData";

const ForwardingCreate = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState(forwardingData[0]);

  const filteredShipments = forwardingData.filter((shipment) => {
    const matchesSearch =
      shipment.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.consignor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.consignee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.origin.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || shipment.priority === priorityFilter;
    const matchesHub = hubFilter === "all" || shipment.origin.hub === hubFilter;
    const matchesTab = activeTab === "all" || shipment.status === activeTab;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesHub &&
      matchesTab
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection />
      <StatisticsSection stats={forwardingStats} />
      <QuickActions />
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        hubFilter={hubFilter}
        setHubFilter={setHubFilter}
      />
      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={forwardingData}
      />
      <MainContent
        filteredShipments={filteredShipments}
        selectedShipment={selectedShipment}
        setSelectedShipment={setSelectedShipment}
      />
    </div>
  );
};

export default ForwardingCreate;
