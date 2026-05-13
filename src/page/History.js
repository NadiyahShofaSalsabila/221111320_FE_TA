import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function History() {
    const [historyData, setHistoryData] = useState([
        {
            id: 1,
            date: "2026-04-07",
            model: "LSTM",
            prediction: "2,920",
        },
        {
            id: 2,
            date: "2026-04-08",
            model: "BiLSTM",
            prediction: "2,945",
        },
        {
            id: 3,
            date: "2026-04-09",
            model: "LSTM",
            prediction: "2,970",
        },
        {
            id: 4,
            date: "2026-04-10",
            model: "BiLSTM",
            prediction: "3,010",
        },
    ]);

    // ================= DELETE HISTORY =================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus history prediksi ini?"
        );

        if (confirmDelete) {
            setHistoryData(
                historyData.filter((item) => item.id !== id)
            );
        }
    };

    return (
        <main className="py-5 bg-light min-vh-100">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="fw-bold">
                        HISTORY PREDIKSI HARGA SAHAM
                        <br />
                        DENGAN PRE-TRAINED MODEL
                    </h1>
                </div>

                {/* Table */}
                <div className="card border-0 shadow rounded-4 overflow-hidden">
                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle mb-0">

                            <thead className="table-dark text-center">
                                <tr>
                                    <th>DATE</th>
                                    <th>MODEL</th>
                                    <th>HASIL PREDIKSI</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>

                            <tbody>
                                {historyData.length > 0 ? (
                                    historyData.map((item) => (
                                        <tr key={item.id} className="text-center">

                                            <td>{item.date}</td>

                                            <td>{item.model}</td>

                                            <td>{item.prediction}</td>

                                            <td>
                                                <div className="d-flex justify-content-center">

                                                    <button
                                                        className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <FaTrash />
                                                        HAPUS
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-4 text-muted"
                                        >
                                            Belum ada history prediksi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>

            </div>
        </main>
    );
}