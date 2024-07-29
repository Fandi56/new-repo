import React, { useState } from "react";
import { saveAs } from "file-saver";
import { format } from "date-fns";

export default function ExportButton({ citizens }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleExportCSV = () => {
        const headers = [
            "NIK",
            "Nama",
            "Alamat",
            "Kelurahan",
            "Operator",
            "Waktu Cetak",
            "Keterangan",
            "Catatan",
        ];

        // Clean and format data
        const cleanData = citizens.map((item) => ({
            ...item,
            alamat: item.alamat.replace(/\n/g, " "),
        }));

        // Convert to CSV string
        const csvRows = [];
        csvRows.push(headers.join(",")); // Add headers row
        cleanData.forEach((item) => {
            const row = [
                item.nik,
                item.nama,
                item.alamat,
                item.kelurahan,
                item.opr,
                item.waktu_cetak,
                item.keterangan,
                item.catatan,
            ];
            csvRows.push(row.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

        const filename = `citizen_data_${format(new Date(), "yyyy-MM-dd")}.csv`;
        saveAs(blob, filename);
    };

    const handlePrint = () => {
        const printContents =
            document.getElementById("citizen-table").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    Export
                    <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <button
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={handleExportCSV}
                        >
                            Export as CSV
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={handlePrint}
                        >
                            Print
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}