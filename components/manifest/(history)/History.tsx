// app/dashboard/manifest/history/components/History.tsx
"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsSection from "./StatisticsSection";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import MainContent from "./MainContent";
import { historyData, historyStats } from "./data/mockData";

const History = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedHistory, setSelectedHistory] = useState(historyData[0]);

  const filteredHistory = historyData.filter((history) => {
    const matchesSearch =
      history.manifestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.origin.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || history.status === statusFilter;
    const matchesHub = hubFilter === "all" || history.origin.hub === hubFilter;
    const matchesDate =
      dateFilter === "all" || history.dateRange === dateFilter;
    const matchesTab = activeTab === "all" || history.status === activeTab;

    return (
      matchesSearch && matchesStatus && matchesHub && matchesDate && matchesTab
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection />
      <StatisticsSection stats={historyStats} />
      <QuickActions />
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        hubFilter={hubFilter}
        setHubFilter={setHubFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={historyData}
      />
      <MainContent
        filteredHistory={filteredHistory}
        selectedHistory={selectedHistory}
        setSelectedHistory={setSelectedHistory}
      />
    </div>
  );
};

export default History;
