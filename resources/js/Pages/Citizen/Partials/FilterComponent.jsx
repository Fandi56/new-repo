import React from "react";

export default function FilterComponent({ startDate, endDate, searchTerm, setStartDate, setEndDate, setSearchTerm, handleFilter }) {
    return (
        <div className="container">
            <h2 className="mb-3 fs-4 fw-normal">
                Filter Berdasarkan Tanggal
            </h2>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>sampai</span>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleFilter}
                    >
                        Cari
                    </button>
                </div>

                <div>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}