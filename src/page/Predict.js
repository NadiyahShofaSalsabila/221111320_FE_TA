import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyData = [
    {
        date: "2026-04-01",
        close: "2850",
        high: "2920",
        low: "2810",
        open: "2870",
    },
    {
        date: "2026-04-02",
        close: "2860",
        high: "2900",
        low: "2830",
        open: "2845",
    },
    {
        date: "2026-04-03",
        close: "2810",
        high: "2870",
        low: "2780",
        open: "2855",
    },
    {
        date: "2026-04-04",
        close: "2795",
        high: "2840",
        low: "2760",
        open: "2810",
    },
    {
        date: "2026-04-05",
        close: "2820",
        high: "2880",
        low: "2790",
        open: "2830",
    },
];

const models = [
    {
        name: "LSTM",
        timestep: 2,
    },
    {
        name: "BiLSTM",
        timestep: 3,
    },
];

export default function Predict() {
    const navigate = useNavigate();

    const [selectedModel, setSelectedModel] = useState("");
    const [selectedTimeStep, setSelectedTimeStep] = useState(0);
    const [inputData, setInputData] = useState([]);
    const [result, setResult] = useState(null);

    // ================= LOAD DATA =================
    const handleModelChange = (e) => {
        const modelName = e.target.value;

        setSelectedModel(modelName);

        if (!modelName) {
            setInputData([]);
            setSelectedTimeStep(0);
            return;
        }

        const selected = models.find(
            (item) => item.name === modelName
        );

        const timestep = selected.timestep;

        setSelectedTimeStep(timestep);

        const dataToShow = dummyData.slice(0, timestep);

        setInputData(dataToShow);

        // reset result
        setResult(null);
    };

    // ================= PREDIKSI =================
    const jalankanPrediksi = () => {
        if (!selectedModel || inputData.length === 0) return;

        const lastDateStr =
            inputData[inputData.length - 1].date;

        const lastDate = new Date(lastDateStr);

        const nextDate = new Date(lastDate);

        nextDate.setDate(nextDate.getDate() + 1);

        const formattedDate = nextDate
            .toISOString()
            .split("T")[0];

        const displayDate = formattedDate
            .split("-")
            .reverse()
            .join("/");

        setResult({
            date: formattedDate,
            displayDate,
            model: selectedModel,
            prediction: "Rp 2,985",
        });
    };

    return (
        <main className="py-5 bg-light min-vh-100">
            <div className="container">

                {/* Title */}
                <div className="text-center mb-5">
                    <h1 className="fw-bold">
                        PREDIKSI HARGA SAHAM
                        <br />
                        DENGAN PRE-TRAINED MODEL
                    </h1>
                </div>

                {/* Card */}
                <div className="card border-0 shadow rounded-4 p-4">

                    {/* Select Model */}
                    <div className="mb-4 d-flex align-items-center gap-3">

                        <label className="fw-semibold mb-0">
                            Model:
                        </label>

                        <select
                            className="form-select"
                            style={{ maxWidth: "300px" }}
                            value={selectedModel}
                            onChange={handleModelChange}
                        >
                            <option value="">Pilih Model</option>

                            {models.map((model, index) => (
                                <option
                                    key={index}
                                    value={model.name}
                                >
                                    {model.name} (TimeStep: {model.timestep})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Input Data */}
                    {inputData.length > 0 && (
                        <div className="mb-4">

                            <h4 className="fw-bold mb-3">
                                Data Input (Historical Data)
                            </h4>

                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">

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
                                        {inputData.map((row, index) => (
                                            <tr key={index} className="text-center">
                                                <td>{row.date}</td>
                                                <td>{row.close}</td>
                                                <td>{row.high}</td>
                                                <td>{row.low}</td>
                                                <td>{row.open}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    )}

                    {/* Predict Button */}
                    <div className="text-center mb-4">
                        <button
                            className="btn btn-primary btn-lg px-5"
                            disabled={!selectedModel}
                            onClick={jalankanPrediksi}
                        >
                            PREDIKSI
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="mt-4">

                            <h2 className="fw-bold text-center mb-4">
                                HASIL PREDIKSI HARGA SAHAM
                            </h2>

                            <div className="alert alert-info fs-5">
                                <strong>Prediksi Harga:</strong>{" "}
                                {result.displayDate}
                            </div>

                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark text-center">
                                        <tr>
                                            <th>DATE</th>
                                            <th>MODEL</th>
                                            <th>HASIL PREDIKSI</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="text-center">
                                            <td>{result.date}</td>
                                            <td>{result.model}</td>
                                            <td>{result.prediction}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                            {/* History Button */}
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-secondary px-4 py-2"
                                    onClick={() => navigate("/history")}
                                >
                                    HISTORY PREDIKSI
                                </button>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}