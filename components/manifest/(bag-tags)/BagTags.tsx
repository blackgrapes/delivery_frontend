// app/dashboard/manifest/bag-tags/components/BagTags.tsx
"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsSection from "./StatisticsSection";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import MainContent from "./MainContent";
import { bagTagsData, bagTagsStats } from "./data/mockData";

const BagTags = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedBag, setSelectedBag] = useState(bagTagsData[0]);

  const filteredBags = bagTagsData.filter((bag) => {
    const matchesSearch =
      bag.bagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.origin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.manifestNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || bag.status === statusFilter;
    const matchesHub = hubFilter === "all" || bag.origin.hub === hubFilter;
    const matchesType = typeFilter === "all" || bag.type === typeFilter;
    const matchesTab = activeTab === "all" || bag.status === activeTab;

    return (
      matchesSearch && matchesStatus && matchesHub && matchesType && matchesTab
    );
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection />
      <StatisticsSection stats={bagTagsStats} />
      <QuickActions />
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        hubFilter={hubFilter}
        setHubFilter={setHubFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={bagTagsData}
      />
      <MainContent
        filteredBags={filteredBags}
        selectedBag={selectedBag}
        setSelectedBag={setSelectedBag}
      />
    </div>
  );
};

export default BagTags;
