import React, { useRef, useState } from "react";
import {
    FaUpload,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

export default function Model() {
    const [models, setModels] = useState([
        {
            id: 1,
            nama: "LSTM",
            timestep: 2,
        },
        {
            id: 2,
            nama: "BiLSTM",
            timestep: 2,
        },
    ]);

    // ================= MODAL STATE =================
    const [showTambahModal, setShowTambahModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // ================= TAMBAH MODEL =================
    const [namaModel, setNamaModel] = useState("");
    const [timeStep, setTimeStep] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // ================= EDIT MODEL =================
    const [editId, setEditId] = useState(null);
    const [editNamaModel, setEditNamaModel] = useState("");
    const [editTimeStep, setEditTimeStep] = useState("");
    const [editFile, setEditFile] = useState(null);

    const tambahFileRef = useRef(null);
    const editFileRef = useRef(null);

    // ================= TAMBAH MODEL =================
    const handleTambahModel = () => {
        if (!namaModel || !timeStep) {
            alert("Nama Model dan TimeStep wajib diisi!");
            return;
        }

        const newModel = {
            id: models.length + 1,
            nama: namaModel,
            timestep: timeStep,
        };

        setModels([...models, newModel]);

        setNamaModel("");
        setTimeStep("");
        setSelectedFile(null);

        setShowTambahModal(false);
    };

    // ================= EDIT MODEL =================
    const bukaEditModal = (model) => {
        setEditId(model.id);
        setEditNamaModel(model.nama);
        setEditTimeStep(model.timestep);
        setEditFile(null);

        setShowEditModal(true);
    };

    const simpanPerubahan = () => {
        if (!editNamaModel || !editTimeStep) {
            alert("Nama Model dan TimeStep wajib diisi!");
            return;
        }

        const updatedModels = models.map((item) =>
            item.id === editId
                ? {
                    ...item,
                    nama: editNamaModel,
                    timestep: editTimeStep,
                }
                : item
        );

        setModels(updatedModels);
        setShowEditModal(false);
    };

    // ================= HAPUS =================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus model ini?"
        );

        if (confirmDelete) {
            setModels(models.filter((item) => item.id !== id));
        }
    };

    // ================= FILE VALIDATION =================
    const validateFile = (file) => {
        if (!file.name.toLowerCase().endsWith(".h5")) {
            alert("Hanya file .h5 yang diperbolehkan!");
            return false;
        }
        return true;
    };

    return (
        <main className="py-5 bg-light min-vh-100">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="fw-bold">
                        DAFTAR PRE-TRAINED MODEL
                    </h1>
                </div>

                {/* Button Tambah */}
                <div className="d-flex justify-content-end mb-4">
                    <button
                        className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                        onClick={() => setShowTambahModal(true)}
                    >
                        <FaUpload />
                        TAMBAH MODEL BARU
                    </button>
                </div>

                {/* Table */}
                <div className="card border-0 shadow rounded-4 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle mb-0">

                            <thead className="table-dark text-center">
                                <tr>
                                    <th>NO</th>
                                    <th>NAMA MODEL</th>
                                    <th>TIMESTEP</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>

                            <tbody>
                                {models.map((model, index) => (
                                    <tr key={model.id} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{model.nama}</td>
                                        <td>{model.timestep}</td>

                                        <td>
                                            <div className="d-flex justify-content-center gap-2 flex-wrap">

                                                <button
                                                    className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                                                    onClick={() => bukaEditModal(model)}
                                                >
                                                    <FaEdit />
                                                    EDIT
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                                                    onClick={() => handleDelete(model.id)}
                                                >
                                                    <FaTrash />
                                                    HAPUS
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            {/* ================= MODAL TAMBAH ================= */}
            {showTambahModal && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0 shadow">

                            <div className="modal-header">
                                <h4 className="modal-title fw-bold">
                                    TAMBAH PRE-TRAINED MODEL
                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowTambahModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                {/* Nama */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        NAMA MODEL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Masukkan nama model"
                                        value={namaModel}
                                        onChange={(e) => setNamaModel(e.target.value)}
                                    />
                                </div>

                                {/* Upload */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        MODEL YANG TELAH DI TRAINED
                                    </label>

                                    <div>
                                        <button
                                            className="btn btn-secondary w-100"
                                            onClick={() => tambahFileRef.current.click()}
                                        >
                                            <FaUpload className="me-2" />
                                            UPLOAD FILE
                                        </button>

                                        <input
                                            type="file"
                                            accept=".h5"
                                            hidden
                                            ref={tambahFileRef}
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                if (file && validateFile(file)) {
                                                    setSelectedFile(file);
                                                }
                                            }}
                                        />
                                    </div>

                                    {selectedFile && (
                                        <div className="mt-2 text-success">
                                            ✓ {selectedFile.name}
                                        </div>
                                    )}
                                </div>

                                {/* TimeStep */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Jumlah TimeStep
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        placeholder="Masukkan jumlah timestep"
                                        value={timeStep}
                                        onChange={(e) => setTimeStep(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="modal-footer d-flex justify-content-between">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={handleTambahModel}
                                >
                                    TAMBAH MODEL
                                </button>

                                <button
                                    className="btn btn-secondary px-4"
                                    onClick={() => setShowTambahModal(false)}
                                >
                                    BATAL
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* ================= MODAL EDIT ================= */}
            {showEditModal && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0 shadow">

                            <div className="modal-header">
                                <h4 className="modal-title fw-bold">
                                    EDIT PRE-TRAINED MODEL
                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                {/* Nama */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        NAMA MODEL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editNamaModel}
                                        onChange={(e) =>
                                            setEditNamaModel(e.target.value)
                                        }
                                    />
                                </div>

                                {/* Upload */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        MODEL BARU (Opsional)
                                    </label>

                                    <div>
                                        <button
                                            className="btn btn-secondary w-100"
                                            onClick={() => editFileRef.current.click()}
                                        >
                                            <FaUpload className="me-2" />
                                            UPLOAD FILE
                                        </button>

                                        <input
                                            type="file"
                                            accept=".h5"
                                            hidden
                                            ref={editFileRef}
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                if (file && validateFile(file)) {
                                                    setEditFile(file);
                                                }
                                            }}
                                        />
                                    </div>

                                    {editFile && (
                                        <div className="mt-2 text-success">
                                            ✓ {editFile.name}
                                        </div>
                                    )}
                                </div>

                                {/* TimeStep */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Jumlah TimeStep
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        value={editTimeStep}
                                        onChange={(e) =>
                                            setEditTimeStep(e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                            <div className="modal-footer d-flex justify-content-between">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={simpanPerubahan}
                                >
                                    SIMPAN PERUBAHAN
                                </button>

                                <button
                                    className="btn btn-secondary px-4"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    BATAL
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}