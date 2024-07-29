import React, { useState } from "react";
import Pagination from "@/Components/Pagination";

const CitizenTable = ({ citizens = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [citizensPerPage] = useState(25); // Number of citizens per page

    const indexOfLastCitizen = currentPage * citizensPerPage;
    const indexOfFirstCitizen = indexOfLastCitizen - citizensPerPage;
    const currentCitizens = citizens.slice(indexOfFirstCitizen, indexOfLastCitizen);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="row">
            <div className="card" id="citizen-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>NIK</th>
                            <th>Kelurahan</th>
                            <th>Opr</th>
                            <th>Waktu Cetak</th>
                            <th>Keterangan</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCitizens.map((citizen, index) => (
                            <tr key={citizen.nik}>
                                <td>{indexOfFirstCitizen + index + 1}</td>
                                <td>{citizen.nama}</td>
                                <td>{citizen.alamat}</td>
                                <td>{citizen.nik}</td>
                                <td>{citizen.kelurahan}</td>
                                <td>{citizen.opr}</td>
                                <td>{citizen.waktu_cetak}</td>
                                <td>{citizen.keterangan}</td>
                                <td>{citizen.catatan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(citizens.length / citizensPerPage)}
                    onPageChange={paginate}
                />
            </div>
        </div>
    );
};

export default CitizenTable;
