"use client";

import { useState } from "react";
import VehiclesHeader from "./VehiclesHeader";
import VehiclesStats from "./VehiclesStats";
import VehiclesFilters from "./VehiclesFilters";
import VehiclesList from "./VehiclesList";
import { Vehicle } from "./types";
import { mockVehicles } from "./mockData";

const VehiclesManagement = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const filteredVehicles = vehicles.filter((v) => {
        const matchesSearch = v.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.make.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
        const matchesType = typeFilter === "ALL" || v.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="space-y-2 p-1">
            <VehiclesHeader
                count={vehicles.length}
                onAdd={() => console.log("Add Vehicle")}
            />

            <VehiclesStats vehicles={vehicles} />

            <VehiclesFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
            />

            <VehiclesList
                vehicles={filteredVehicles}
                onEdit={(v) => console.log("Edit", v)}
                onDelete={(id) => console.log("Delete", id)}
            />
        </div>
    );
};

export default VehiclesManagement;
