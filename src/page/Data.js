import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";
import {
    FaChartLine,
    FaUpload,
} from "react-icons/fa";

export default function Data() {

    const [stockData, setStockData] = useState([]);
    const [file, setFile] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [chartData, setChartData] = useState(null);

    // =========================
    // GET DATA SAHAM
    // =========================

    const fetchStockData = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/stocks"
            );

            const data = await response.json();

            setStockData(data);

        } catch (error) {

            console.error(
                "Gagal mengambil data saham:",
                error
            );

        }

    };

    useEffect(() => {

        fetchStockData();

    }, []);

    const fetchChartData = async () => {
        const res = await fetch(
            "http://localhost:5000/api/stocks/chart"
        );

        const data = await res.json();

        setChartData(data);
    };

    // =========================
    // UPLOAD CSV
    // =========================

    const handleUpload = async () => {

        if (!file) {
            alert("Pilih file CSV terlebih dahulu");
            return;
        }

        setUploading(true);

        try {

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "http://localhost:5000/api/stocks/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (result.success) {

                await fetchStockData();

                setUploading(false);

                alert(
                    `Upload berhasil (${result.total_data} data)`
                );

                setShowUploadModal(false);

                setFile(null);

            } else {

                setUploading(false);

                alert(
                    result.message ||
                    "Upload gagal"
                );

            }

        } catch (error) {

            console.error(error);

            setUploading(false);

            alert("Terjadi kesalahan");

        }

    };

    return (

        <main className="py-5 bg-light min-vh-100">

            <div className="container">

                {/* Header */}

                <div className="text-center mb-4">

                    <h1 className="fw-bold text-dark">
                        DATA HARGA SAHAM
                        <br />
                        PT ANEKA TAMBANG TBK
                    </h1>

                </div>

                {/* Action Buttons */}

                <div className="d-flex justify-content-end gap-3 flex-wrap mb-4">

                    <button
                        className="btn btn-secondary d-flex align-items-center gap-2 px-4 py-2"
                        onClick={() => {
                            setShowModal(true);
                            fetchChartData();
                        }}
                    >
                        <FaChartLine />
                        LIHAT GRAFIK
                    </button>

                    <button
                        className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                        onClick={() => setShowUploadModal(true)}
                    >
                        <FaUpload />
                        UPLOAD DATA
                    </button>

                </div>

                {/* TABLE */}

                <div className="card shadow border-0 rounded-4 overflow-hidden">

                    <div className="table-responsive">

                        <table className="table table-hover table-bordered align-middle mb-0">

                            <thead className="table-dark text-center">

                                <tr>
                                    <th>DATE</th>
                                    <th>OPEN</th>
                                    <th>HIGH</th>
                                    <th>LOW</th>
                                    <th>CLOSE</th>

                                </tr>

                            </thead>

                            <tbody>

                                {stockData.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
                                            Belum ada data saham
                                        </td>

                                    </tr>

                                ) : (

                                    stockData.map((item) => (

                                        <tr
                                            key={item.id_data}
                                            className="text-center"
                                        >

                                            <td>
                                                {new Date(item.date).toLocaleDateString("id-ID")}
                                            </td>

                                            <td>
                                                {item.open_price}
                                            </td>

                                            <td>
                                                {item.high_price}
                                            </td>

                                            <td>
                                                {item.low_price}
                                            </td>

                                            <td>
                                                {item.close_price}
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* ========================= */}
            {/* MODAL GRAFIK */}
            {/* ========================= */}

            {showModal && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0,0,0,0.5)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content rounded-4 border-0 shadow">

                            <div className="modal-header border-0">

                                <h4 className="modal-title fw-bold">
                                    GRAFIK HARGA SAHAM
                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                />

                            </div>

                            <div className="modal-body text-center py-5">

                                <div className="border rounded-4 p-5 bg-light">

                                    {chartData && chartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={400}>
                                            <AreaChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" />

                                                <XAxis
                                                    dataKey="date"
                                                    tickFormatter={(date) =>
                                                        new Date(date).toLocaleDateString("id-ID", {
                                                            month: "short",
                                                            year: "2-digit"
                                                        })
                                                    }
                                                />

                                                <YAxis />

                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: "12px"
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="close_price"
                                                    stroke="#4f46e5"
                                                    fill="#4f46e5"
                                                    fillOpacity={0.2}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-[400px] text-gray-500">
                                            Belum ada data chart
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* ========================= */}
            {/* MODAL UPLOAD */}
            {/* ========================= */}

            {showUploadModal && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0,0,0,0.5)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content rounded-4 border-0 shadow">

                            <div className="modal-header">

                                <h4 className="fw-bold mb-0">
                                    Upload Data Saham
                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() =>
                                        setShowUploadModal(false)
                                    }
                                />

                            </div>

                            <div className="modal-body">

                                <label className="form-label fw-semibold">

                                    Pilih File CSV

                                </label>

                                <input
                                    type="file"
                                    accept=".csv"
                                    className="form-control"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files[0]
                                        )
                                    }
                                />

                                {file && (

                                    <div className="alert alert-info mt-3">

                                        {file.name}

                                    </div>

                                )}

                                {uploading && (

                                    <div className="mt-4">

                                        <div className="d-flex align-items-center justify-content-center mb-3">

                                            <div
                                                className="spinner-border text-primary me-2"
                                                role="status"
                                            />

                                            <span className="fw-semibold">
                                                Sedang mengunggah dan memproses data...
                                            </span>

                                        </div>

                                    </div>


                                )}

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowUploadModal(false)
                                    }
                                >
                                    Batal
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpload}
                                    disabled={uploading}
                                >

                                    {uploading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            />
                                            Memproses...
                                        </>
                                    ) : (
                                        "Upload"
                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </main>

    );
}