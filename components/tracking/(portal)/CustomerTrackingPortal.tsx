"use client";

import { useState } from "react";
import HeaderSection from "./HeaderSection";
import StatisticsCards from "./StatisticsCards";
import QuickActions from "./QuickActions";
import FiltersSection from "./FiltersSection";
import StatusTabs from "./StatusTabs";
import TrackingList from "./TrackingList";
import TrackingDetails from "./TrackingDetails";
import { customerTrackingData, trackingStats } from "./data/mockData";

const CustomerTrackingPortal = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedTracking, setSelectedTracking] = useState(
    customerTrackingData[0]
  );

  const filteredTracking = customerTrackingData.filter((tracking) => {
    const matchesSearch =
      tracking.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracking.customer.phone.includes(searchTerm) ||
      tracking.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || tracking.status === statusFilter;
    const matchesCity =
      cityFilter === "all" || tracking.customer.city === cityFilter;
    const matchesTab = activeTab === "all" || tracking.status === activeTab;

    return matchesSearch && matchesStatus && matchesCity && matchesTab;
  });

  return (
    <div className="space-y-6 p-6">
      <HeaderSection />
      <StatisticsCards stats={trackingStats} />
      <QuickActions />
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
      />
      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        trackingData={customerTrackingData}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TrackingList
          trackingData={filteredTracking}
          selectedTracking={selectedTracking}
          setSelectedTracking={setSelectedTracking}
        />
        <TrackingDetails tracking={selectedTracking} />
      </div>
    </div>
  );
};

export default CustomerTrackingPortal;
