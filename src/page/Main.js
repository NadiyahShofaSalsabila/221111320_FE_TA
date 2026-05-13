import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
    FaBrain,
    FaHome,
    FaDatabase,
    FaCogs,
    FaMagic,
    FaHistory,
} from "react-icons/fa";

export default function MainLayout() {
    return (
        <div className="min-vh-100 bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container">

                    {/* Logo */}
                    <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-circle bg-primary"
                            style={{ width: "40px", height: "40px" }}
                        >
                            <FaBrain className="text-white" />
                        </div>

                        <span className="fw-bold">
                            A-<span className="text-primary">STOCK</span>
                        </span>
                    </NavLink>

                    {/* Hamburger */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu */}
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <div className="navbar-nav ms-auto gap-lg-2">

                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""
                                    }`
                                }
                            >
                                <FaHome />
                                <span>Home</span>
                            </NavLink>

                            <NavLink
                                to="/data"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""
                                    }`
                                }
                            >
                                <FaDatabase />
                                <span>Data</span>
                            </NavLink>

                            <NavLink
                                to="/model"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""
                                    }`
                                }
                            >
                                <FaCogs />
                                <span>Model</span>
                            </NavLink>

                            <NavLink
                                to="/predict"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""
                                    }`
                                }
                            >
                                <FaMagic />
                                <span>Predict</span>
                            </NavLink>

                            <NavLink
                                to="/history"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""
                                    }`
                                }
                            >
                                <FaHistory />
                                <span>History</span>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <Outlet />
        </div>
    );
}