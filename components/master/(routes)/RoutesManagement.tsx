"use client";

import { useState } from "react";
import RoutesHeader from "./RoutesHeader";
import RoutesStats from "./RoutesStats";
import RoutesFilters from "./RoutesFilters";
import RoutesList from "./RoutesList";
import { Route } from "./types";
import { mockRoutes } from "./mockData";

const RoutesManagement = () => {
    const [routes, setRoutes] = useState<Route[]>(mockRoutes);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const filteredRoutes = routes.filter((r) => {
        const matchesSearch = r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.sourceCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
        const matchesType = typeFilter === "ALL" || r.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="space-y-2 p-1">
            <RoutesHeader
                count={routes.length}
                onAdd={() => console.log("Add Route")}
            />

            <RoutesStats routes={routes} />

            <RoutesFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
            />

            <RoutesList
                routes={filteredRoutes}
                onEdit={(r) => console.log("Edit", r)}
                onDelete={(id) => console.log("Delete", id)}
            />
        </div>
    );
};

export default RoutesManagement;
