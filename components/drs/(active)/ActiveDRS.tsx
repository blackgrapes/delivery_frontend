"use client";

import { useState } from "react";
import DRSHeader from "./DRSHeader";
import DRSStats from "./DRSStats";
import MonitoringTools from "./MonitoringTools";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import DRSContent from "./DRSContent";
import { activeDRSData, drsStats } from "./data/mockData";
import { ImportDialog, ExportDialog } from "../shared/ActionDialogs";

const ActiveDRS = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riderFilter, setRiderFilter] = useState("all");
  const [selectedDRS, setSelectedDRS] = useState(activeDRSData[0]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filteredDRS = activeDRSData.filter((drs) => {
    const matchesSearch =
      drs.drsNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drs.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drs.rider.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || drs.status === statusFilter;
    const matchesRider = riderFilter === "all" || drs.rider.id === riderFilter;
    const matchesTab = activeTab === "all" || drs.status === activeTab;

    return matchesSearch && matchesStatus && matchesRider && matchesTab;
  });

  return (
    <div className="space-y-6 p-6">
      <DRSHeader
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        onImport={() => setIsImportOpen(true)}
        onExport={() => setIsExportOpen(true)}
      />

      <DRSStats stats={drsStats} />

      <MonitoringTools />

      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riderFilter={riderFilter}
        setRiderFilter={setRiderFilter}
      />

      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeDRSData={activeDRSData}
      />

      <DRSContent
        filteredDRS={filteredDRS}
        selectedDRS={selectedDRS}
        setSelectedDRS={setSelectedDRS}
      />

      <ImportDialog open={isImportOpen} onOpenChange={setIsImportOpen} />
      <ExportDialog open={isExportOpen} onOpenChange={setIsExportOpen} />
    </div>
  );
};

export default ActiveDRS;
