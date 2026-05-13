import React, { useState } from "react";
import {
    FaChartLine,
    FaUpload,
    FaTimes,
} from "react-icons/fa";

const stockData = [
    {
        date: "2026-04-07",
        close: "2,850",
        high: "2,920",
        low: "2,810",
        open: "2,870",
    },
    {
        date: "2026-04-06",
        close: "2,860",
        high: "2,900",
        low: "2,830",
        open: "2,845",
    },
    {
        date: "2026-04-05",
        close: "2,810",
        high: "2,870",
        low: "2,780",
        open: "2,855",
    },
    {
        date: "2026-04-04",
        close: "2,795",
        high: "2,840",
        low: "2,760",
        open: "2,810",
    },
    {
        date: "2026-04-03",
        close: "2,820",
        high: "2,880",
        low: "2,790",
        open: "2,830",
    },
];

export default function Data() {
    const [showModal, setShowModal] = useState(false);

    return (
        <main className="py-5 bg-light min-vh-100">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-dark">
                        DATA HARGA SAHAM <br />
                        PT ANEKA TAMBANG TBK
                    </h1>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-3 flex-wrap mb-4">

                    <button
                        className="btn btn-secondary d-flex align-items-center gap-2 px-4 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        <FaChartLine />
                        LIHAT GRAFIK
                    </button>

                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
                        <FaUpload />
                        UPLOAD DATA
                    </button>

                </div>

                {/* Table */}
                <div className="card shadow border-0 rounded-4 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle mb-0">

                            <thead className="table-dark text-center">
                                <tr>
                                    <th>DATE</th>
                                    <th>CLOSE</th>
                                    <th>HIGH</th>
                                    <th>LOW</th>
                                    <th>OPEN</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stockData.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{item.date}</td>
                                        <td>{item.close}</td>
                                        <td>{item.high}</td>
                                        <td>{item.low}</td>
                                        <td>{item.open}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content rounded-4 border-0 shadow">

                            {/* Header */}
                            <div className="modal-header border-0">
                                <h4 className="modal-title fw-bold">
                                    GRAFIK HARGA SAHAM
                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            {/* Body */}
                            <div className="modal-body text-center py-5">

                                <div className="border rounded-4 p-5 bg-light">
                                    <FaChartLine
                                        size={70}
                                        className="text-primary mb-4"
                                    />

                                    <p className="fs-5 text-muted mb-0">
                                        Grafik Harga Saham PT Aneka Tambang TBK
                                        <br />
                                        akan ditampilkan di sini
                                    </p>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-0 justify-content-center pb-4">
                                <button
                                    className="btn btn-danger px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    <FaTimes />
                                    TUTUP
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}