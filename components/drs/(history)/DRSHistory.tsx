"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import PerformanceOverview from "./PerformanceOverview";
import AnalyticsSummary from "./AnalyticsSummary";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import DRSContent from "./DRSContent";
import { drsHistoryData, performanceStats } from "./data";

const DRSHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riderFilter, setRiderFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedDRS, setSelectedDRS] = useState(drsHistoryData[0]);
  const [viewMode, setViewMode] = useState("detailed");

  const filteredDRS = drsHistoryData.filter((drs) => {
    const matchesSearch =
      drs.drsNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drs.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drs.rider.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || drs.status === statusFilter;
    const matchesRider = riderFilter === "all" || drs.rider.id === riderFilter;
    const matchesTab = activeTab === "all" || drs.status === activeTab;

    // Date filter logic
    const drsDate = new Date(drs.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);
    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = drsDate.toDateString() === today.toDateString();
    } else if (dateFilter === "yesterday") {
      matchesDate = drsDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === "last7") {
      matchesDate = drsDate >= last7Days;
    } else if (dateFilter === "last30") {
      matchesDate = drsDate >= last30Days;
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRider &&
      matchesTab &&
      matchesDate
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection viewMode={viewMode} setViewMode={setViewMode} />
      <PerformanceOverview performanceStats={performanceStats} />
      <AnalyticsSummary performanceStats={performanceStats} />

      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riderFilter={riderFilter}
        setRiderFilter={setRiderFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        drsHistoryData={drsHistoryData}
      />

      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        drsHistoryData={drsHistoryData}
      />

      <DRSContent
        filteredDRS={filteredDRS}
        selectedDRS={selectedDRS}
        setSelectedDRS={setSelectedDRS}
        performanceStats={performanceStats}
      />
    </div>
  );
};

export default DRSHistory;
