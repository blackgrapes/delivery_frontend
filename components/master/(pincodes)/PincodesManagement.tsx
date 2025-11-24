// components/master/pincodes/PincodesManagement.tsx
"use client";

import { useState } from "react";
import PincodesHeader from "./PincodesHeader";
import PincodesStats from "./PincodesStats";
import PincodesFilters from "./PincodesFilters";
import PincodesList from "./PincodesList";
import PincodeForm from "./PincodeForm";
import BulkUploadModal from "./BulkUploadModal";
import { Pincode, PincodeFormData } from "./types";
import { mockPincodes } from "./mockData";

const PincodesManagement = () => {
  const [pincodes, setPincodes] = useState<Pincode[]>(mockPincodes);
  const [selectedPincode, setSelectedPincode] = useState<Pincode | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const handleAddPincode = () => {
    setSelectedPincode(null);
    setShowForm(true);
  };

  const handleEditPincode = (pincode: Pincode) => {
    setSelectedPincode(pincode);
    setShowForm(true);
  };

  const handleSavePincode = (formData: PincodeFormData) => {
    if (selectedPincode) {
      // Update existing pincode
      setPincodes(
        pincodes.map((p) =>
          p.id === selectedPincode.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Add new pincode
      const newPincode: Pincode = {
        id: `PIN-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPincodes([...pincodes, newPincode]);
    }
    setShowForm(false);
    setSelectedPincode(null);
  };

  const handleDeletePincode = (pincodeId: string) => {
    setPincodes(pincodes.filter((p) => p.id !== pincodeId));
  };

  const handleToggleStatus = (pincodeId: string) => {
    setPincodes(
      pincodes.map((pincode) =>
        pincode.id === pincodeId
          ? {
              ...pincode,
              status: pincode.status === "active" ? "inactive" : "active",
            }
          : pincode
      )
    );
  };

  const handleBulkUpload = (data: any[]) => {
    // Process bulk upload data
    const newPincodes: Pincode[] = data.map((item, index) => ({
      id: `BULK-${Date.now()}-${index}`,
      pincode: item.pincode,
      city: item.city,
      state: item.state,
      district: item.district,
      country: item.country || "India",
      serviceability: item.serviceability || "standard",
      deliveryTime: item.deliveryTime || "2-3 days",
      codAvailable: item.codAvailable !== undefined ? item.codAvailable : true,
      pickupAvailable:
        item.pickupAvailable !== undefined ? item.pickupAvailable : true,
      lastMilePartner: item.lastMilePartner || "Local Partner",
      hubAssigned: item.hubAssigned || "Auto-assigned",
      status: "active",
      specialInstructions: item.specialInstructions || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setPincodes([...pincodes, ...newPincodes]);
    setShowBulkUpload(false);
  };

  const filteredPincodes = pincodes.filter((pincode) => {
    const matchesSearch =
      pincode.pincode.includes(searchTerm) ||
      pincode.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pincode.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pincode.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || pincode.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || pincode.serviceability === serviceFilter;
    const matchesState = stateFilter === "all" || pincode.state === stateFilter;

    return matchesSearch && matchesStatus && matchesService && matchesState;
  });

  return (
    <div className="space-y-6 p-6">
      <PincodesHeader
        onAddPincode={handleAddPincode}
        onBulkUpload={() => setShowBulkUpload(true)}
        pincodeCount={pincodes.length}
      />

      <PincodesStats pincodes={pincodes} />

      <PincodesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        stateFilter={stateFilter}
        onStateFilterChange={setStateFilter}
        pincodes={pincodes}
      />

      <PincodesList
        pincodes={filteredPincodes}
        onEditPincode={handleEditPincode}
        onDeletePincode={handleDeletePincode}
        onToggleStatus={handleToggleStatus}
      />

      {showForm && (
        <PincodeForm
          pincode={selectedPincode}
          onSave={handleSavePincode}
          onCancel={() => {
            setShowForm(false);
            setSelectedPincode(null);
          }}
        />
      )}

      {showBulkUpload && (
        <BulkUploadModal
          onUpload={handleBulkUpload}
          onCancel={() => setShowBulkUpload(false)}
        />
      )}
    </div>
  );
};

export default PincodesManagement;
