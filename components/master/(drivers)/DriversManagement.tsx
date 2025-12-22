"use client";

import { useState } from "react";
import DriversHeader from "./DriversHeader";
import DriversStats from "./DriversStats";
import DriversFilters from "./DriversFilters";
import DriversList from "./DriversList";
import { Driver } from "./types";
import { mockDrivers } from "./mockData";

const DriversManagement = () => {
    const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const filteredDrivers = drivers.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.phone.includes(searchTerm);
        const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-2 p-1">
            <DriversHeader
                count={drivers.length}
                onAdd={() => console.log("Add Driver")}
            />

            <DriversStats drivers={drivers} />

            <DriversFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <DriversList
                drivers={filteredDrivers}
                onEdit={(d) => console.log("Edit", d)}
                onDelete={(id) => console.log("Delete", id)}
            />
        </div>
    );
};

export default DriversManagement;
