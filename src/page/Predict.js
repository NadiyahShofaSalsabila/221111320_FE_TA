import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

const formatPrice = (price) => {
    return Number(price).toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    });
};

export default function Predict() {

    const navigate = useNavigate();

    const [models, setModels] = useState([]);

    const [selectedModel, setSelectedModel] =
        useState("");

    const [selectedTimeStep, setSelectedTimeStep] =
        useState(0);

    const [inputData, setInputData] =
        useState([]);

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    // =====================================
    // LOAD MODEL
    // =====================================

    const fetchModels = async () => {

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/models"
                );

            const data =
                await response.json();

            setModels(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchModels();

    }, []);

    // =====================================
    // PILIH MODEL
    // =====================================

    const handleModelChange =
        async (e) => {

            const modelId =
                e.target.value;

            setSelectedModel(
                modelId
            );

            setResult(null);

            if (!modelId) {

                setInputData([]);
                setSelectedTimeStep(0);

                return;

            }

            try {

                const selected =
                    models.find(
                        item =>
                            item.id_model ===
                            Number(modelId)
                    );

                if (!selected)
                    return;

                setSelectedTimeStep(
                    selected.timestep
                );

                const response =
                    await fetch(
                        "http://localhost:5000/api/stocks"
                    );

                const stocks =
                    await response.json();

                const latestData =
                    stocks.slice(
                        0,
                        selected.timestep
                    );

                setInputData(
                    [...latestData].reverse()
                );

            } catch (error) {

                console.error(error);

            }

        };

    // =====================================
    // PREDIKSI
    // =====================================

    const jalankanPrediksi =
        async () => {

            try {

                setLoading(true);

                const response =
                    await fetch(
                        "http://localhost:5000/api/predict",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                id_model:
                                    Number(
                                        selectedModel
                                    )
                            })
                        }
                    );

                const data =
                    await response.json();

                if (!data.success) {

                    alert(
                        data.message
                    );

                    setLoading(false);

                    return;

                }

                const selected =
                    models.find(
                        item =>
                            item.id_model ===
                            Number(
                                selectedModel
                            )
                    );

                setResult({
                    date:
                        data.date_prediksi,
                    model:
                        selected.nama_model,
                    prediction:
                        data.harga_prediksi
                });

            } catch (error) {

                console.error(error);

            }

            setLoading(false);

        };

    return (
        <main className="py-5 bg-light min-vh-100">

            <div className="container">

                {/* TITLE */}

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        PREDIKSI HARGA SAHAM
                        <br />
                        DENGAN PRE-TRAINED MODEL
                    </h1>

                </div>

                {/* CARD */}

                <div className="card border-0 shadow rounded-4 p-4">

                    {/* MODEL */}

                    <div className="mb-4 d-flex align-items-center gap-3">

                        <label className="fw-semibold mb-0">
                            Model :
                        </label>

                        <select
                            className="form-select"
                            style={{
                                maxWidth:
                                    "350px"
                            }}
                            value={
                                selectedModel
                            }
                            onChange={
                                handleModelChange
                            }
                        >

                            <option value="">
                                Pilih Model
                            </option>

                            {models.map(
                                (
                                    model
                                ) => (
                                    <option
                                        key={
                                            model.id_model
                                        }
                                        value={
                                            model.id_model
                                        }
                                    >
                                        {
                                            model.nama_model
                                        }
                                        {" "}
                                        (
                                        TimeStep:
                                        {" "}
                                        {
                                            model.timestep
                                        }
                                        )
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* HISTORICAL DATA */}

                    {inputData.length >
                        0 && (

                            <div className="mb-4">

                                <h4 className="fw-bold mb-3">
                                    Data Input
                                    (Historical
                                    Data)
                                </h4>

                                <div className="table-responsive">

                                    <table className="table table-bordered table-hover">

                                        <thead className="table-dark text-center">

                                            <tr>
                                                <th>
                                                    DATE
                                                </th>
                                                <th>
                                                    OPEN
                                                </th>
                                                <th>
                                                    HIGH
                                                </th>
                                                <th>
                                                    LOW
                                                </th>
                                                <th>
                                                    CLOSE
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {inputData.map(
                                                (
                                                    row,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            index
                                                        }
                                                        className="text-center"
                                                    >
                                                        <td>
                                                            {
                                                                formatDate(row.date)
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                formatPrice(row.open_price)
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                formatPrice(row.high_price)
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                formatPrice(row.low_price)
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                formatPrice(row.close_price)
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        )}

                    {/* BUTTON */}

                    <div className="text-center mb-4">

                        <button
                            className="btn btn-primary btn-lg px-5"
                            disabled={
                                !selectedModel ||
                                loading
                            }
                            onClick={
                                jalankanPrediksi
                            }
                        >

                            {loading
                                ? "MEMPROSES..."
                                : "PREDIKSI"}

                        </button>

                    </div>

                    {/* HASIL */}

                    {result && (

                        <div className="mt-4">

                            <h2 className="fw-bold text-center mb-4">

                                HASIL PREDIKSI
                                HARGA SAHAM

                            </h2>

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark text-center">

                                        <tr>
                                            <th>
                                                DATE
                                            </th>
                                            <th>
                                                MODEL
                                            </th>
                                            <th>
                                                HASIL PREDIKSI
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        <tr className="text-center">

                                            <td>
                                                {
                                                    formatDate(result.date)
                                                }
                                            </td>

                                            <td>
                                                {
                                                    result.model
                                                }
                                            </td>

                                            <td>
                                                {formatPrice(result.prediction)}
                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-secondary px-4 py-2"
                                    onClick={() =>
                                        navigate(
                                            "/history"
                                        )
                                    }
                                >
                                    HISTORY
                                    PREDIKSI
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </main>
    );
}