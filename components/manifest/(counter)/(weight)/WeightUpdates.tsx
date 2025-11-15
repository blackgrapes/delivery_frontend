"use client";

import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Package,
  Scale,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Upload,
  BarChart3,
  Calculator,
  Ruler,
  Weight,
  Edit,
  Eye,
  Copy,
  Trash2,
  ChevronDown,
  IndianRupee,
  QrCode,
  Shield,
  Zap,
  FileText,
} from "lucide-react";

import { useState } from "react";
import WeightStats from "./WeightStats";
import WeightTools from "./WeightTools";
import WeightFilters from "./WeightFilters";
import WeightTabs from "./WeightTabs";
import WeightList from "./WeightList";
import WeightDetails from "./WeightDetails";
import WeightUpdateModal from "./WeightUpdateModal";
import { weightUpdatesData } from "./data";
import { Button } from "@/components/ui/button";

const WeightUpdates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState(weightUpdatesData[0]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const filteredWeights = weightUpdatesData.filter((weight) => {
    const matchesSearch =
      weight.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weight.shipment.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || weight.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || weight.priority === priorityFilter;
    const matchesHub =
      hubFilter === "all" || weight.processing.hub === hubFilter;
    const matchesTab = activeTab === "all" || weight.status === activeTab;

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
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-orange-100 p-2">
              <Scale className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Weight Updates
              </h1>
              <p className="text-muted-foreground">
                Update and correct shipment weights at hub processing
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-border/70"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-brand">
            <Plus className="h-4 w-4" />
            New Weight Entry
          </Button>
        </div>
      </div>

      <WeightStats />
      <WeightTools />
      <WeightFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        hubFilter={hubFilter}
        setHubFilter={setHubFilter}
      />
      <WeightTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <WeightList
          weights={filteredWeights}
          selectedWeight={selectedWeight}
          setSelectedWeight={setSelectedWeight}
        />
        <WeightDetails
          weight={selectedWeight}
          onUpdateWeight={() => setShowUpdateModal(true)}
        />
      </div>

      {showUpdateModal && (
        <WeightUpdateModal
          weight={selectedWeight}
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default WeightUpdates;
