// app/dashboard/manifest/dispatch/components/Dispatch.tsx
"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsSection from "./StatisticsSection";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import MainContent from "./MainContent";
import { dispatchData, dispatchStats } from "./data/mockData";

const Dispatch = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [selectedDispatch, setSelectedDispatch] = useState(dispatchData[0]);

  const filteredDispatches = dispatchData.filter((dispatch) => {
    const matchesSearch =
      dispatch.manifestNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      dispatch.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.origin.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || dispatch.status === statusFilter;
    const matchesHub = hubFilter === "all" || dispatch.origin.hub === hubFilter;
    const matchesVehicle =
      vehicleFilter === "all" || dispatch.vehicle.type === vehicleFilter;
    const matchesTab = activeTab === "all" || dispatch.status === activeTab;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesHub &&
      matchesVehicle &&
      matchesTab
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection />
      <StatisticsSection stats={dispatchStats} />
      <QuickActions />
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        hubFilter={hubFilter}
        setHubFilter={setHubFilter}
        vehicleFilter={vehicleFilter}
        setVehicleFilter={setVehicleFilter}
      />
      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={dispatchData}
      />
      <MainContent
        filteredDispatches={filteredDispatches}
        selectedDispatch={selectedDispatch}
        setSelectedDispatch={setSelectedDispatch}
      />
    </div>
  );
};

export default Dispatch;
