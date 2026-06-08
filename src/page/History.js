import React, {
    useState,
    useEffect
} from "react";
import { FaTrash } from "react-icons/fa";

export default function History() {
    const [historyData, setHistoryData] = useState([]);

    const fetchHistory = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/predictions"
            );

            const data = await response.json();

            setHistoryData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // ================= DELETE HISTORY =================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Yakin ingin menghapus history prediksi ini?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `http://localhost:5000/api/predictions/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (data.success) {

                setHistoryData(
                    historyData.filter(
                        item =>
                            item.id_prediksi !== id
                    )
                );

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const formatPrice = (price) => {
        return Number(price).toLocaleString(
            "id-ID",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3
            }
        );
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
                                        <tr key={item.id_prediksi} className="text-center">

                                            <td>
                                                {formatDate(
                                                    item.date_prediksi
                                                )}
                                            </td>

                                            <td>
                                                {item.nama_model}
                                            </td>

                                            <td>
                                                {formatPrice(
                                                    item.harga_prediksi
                                                )}
                                            </td>

                                            <td>
                                                <div className="d-flex justify-content-center">

                                                    <button
                                                        className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id_prediksi
                                                            )
                                                        }
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