import React, { useState, useEffect, useCallback } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import CitizenTable from "./Table";
import axios from "axios";
import ExportButton from "./Partials/ExportButton";
import FilterComponent from "./Partials/FilterComponent";

export default function Citizen({ initialCitizens }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [citizens, setCitizens] = useState(initialCitizens);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchData = async (params) => {
        try {
            const response = await axios.get(route("citizens.index"), {
                params,
                headers: {
                    "X-Inertia": "true",
                    "X-Inertia-Version":
                        window.axios.defaults.headers.common[
                            "X-Inertia-Version"
                        ],
                },
            });
            setCitizens(response.data.props.initialCitizens);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilter = () => {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        if (searchTerm) params.search = searchTerm;

        fetchData(params);
    };

    // Debounced function for live search
    const debouncedSearch = useCallback(
        debounce((value) => {
            const params = {};
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;
            if (value) params.search = value;

            fetchData(params);
        }, 300),
        [startDate, endDate]
    );

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch(searchTerm);
        } else {
            handleFilter();
        }
    }, [searchTerm]);

    return (
        <GuestLayout>
            <Head title="Citizen" />

            <div className="col-lg-12 col-12 bg-slate-300">
                <div className="container">
                    <FilterComponent
                        startDate={startDate}
                        endDate={endDate}
                        searchTerm={searchTerm}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setSearchTerm={setSearchTerm}
                        handleFilter={handleFilter}
                    />
                    <div className="container">
                        <ExportButton citizens={citizens} />
                        <CitizenTable citizens={citizens} />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
