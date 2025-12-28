"use client";

import { useState } from "react";
import DRSHeader from "./DRSHeader";
import DRSStats from "./DRSStats";
import QuickActions from "./QuickActions";
import DRSConfiguration from "./DRSConfiguration";
import ShipmentSelection from "./ShipmentSelection";
import {
  availableRiders,
  availableShipments,
  drsTemplates,
} from "./data/mockData";
import { QuickDRSDialog } from "../shared/ActionDialogs";

const CreateDRS = () => {
  const [selectedRider, setSelectedRider] = useState(availableRiders[0]);
  const [selectedShipments, setSelectedShipments] = useState([
    availableShipments[0],
    availableShipments[1],
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drsNumber, setDrsNumber] = useState(
    `DRS-${Date.now().toString().slice(-6)}`
  );
  const [drsDate, setDrsDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [useOptimizedRoute, setUseOptimizedRoute] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isQuickDRSOpen, setIsQuickDRSOpen] = useState(false);

  // Calculate DRS statistics
  const drsStats = {
    totalShipments: selectedShipments.length,
    totalCOD: selectedShipments.reduce((sum, shipment) => {
      const cod =
        shipment.package.codAmount === "-"
          ? 0
          : parseInt(
            shipment.package.codAmount.replace("₹", "").replace(",", "")
          );
      return sum + cod;
    }, 0),
    totalWeight: selectedShipments.reduce((sum, shipment) => {
      const weight = parseFloat(shipment.package.weight);
      return sum + weight;
    }, 0),
    priorityShipments: selectedShipments.filter(
      (s) => s.priority === "critical" || s.priority === "high"
    ).length,
  };

  const filteredShipments = availableShipments.filter(
    (shipment) =>
      shipment.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver.phone.includes(searchTerm) ||
      shipment.receiver.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleShipmentSelection = (shipment: any) => {
    if (selectedShipments.find((s) => s.awbNumber === shipment.awbNumber)) {
      setSelectedShipments(
        selectedShipments.filter((s) => s.awbNumber !== shipment.awbNumber)
      );
    } else {
      setSelectedShipments([...selectedShipments, shipment]);
    }
  };

  const handleCreateDRS = () => {
    // In real app, this would create the DRS
    const newDRS = {
      id: drsNumber,
      rider: selectedRider,
      shipments: selectedShipments,
      date: drsDate,
      notes,
      useOptimizedRoute,
      status: "draft" as const,
      stats: drsStats,
    };
    console.log("Creating DRS:", newDRS);
    alert(`DRS ${drsNumber} created successfully for ${selectedRider.name}`);
  };

  const handleApplyTemplate = (templateId: string) => {
    // In real app, this would apply template settings
    const template = drsTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedShipments(availableShipments.slice(0, template.shipmentCount));
      setNotes(`Applied template: ${template.name}`);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <DRSHeader onQuickCreate={() => setIsQuickDRSOpen(true)} />
      <DRSStats stats={drsStats} />
      <QuickActions
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleApplyTemplate}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - DRS Configuration */}
        <div className="xl:col-span-1 space-y-6">
          <DRSConfiguration
            drsNumber={drsNumber}
            onDrsNumberChange={setDrsNumber}
            drsDate={drsDate}
            onDrsDateChange={setDrsDate}
            notes={notes}
            onNotesChange={setNotes}
            useOptimizedRoute={useOptimizedRoute}
            onUseOptimizedRouteChange={setUseOptimizedRoute}
            selectedRider={selectedRider}
            onRiderChange={setSelectedRider}
            selectedShipments={selectedShipments}
            stats={drsStats}
            onCreateDRS={handleCreateDRS}
          />
        </div>

        {/* Right Panel - Shipment Selection */}
        <div className="xl:col-span-2 space-y-6">
          <ShipmentSelection
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedShipments={selectedShipments}
            onToggleShipment={toggleShipmentSelection}
            filteredShipments={filteredShipments}
          />
        </div>
      </div>
      <QuickDRSDialog open={isQuickDRSOpen} onOpenChange={setIsQuickDRSOpen} />
    </div>
  );
};

export default CreateDRS;
