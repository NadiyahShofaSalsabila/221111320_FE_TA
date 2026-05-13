import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
    "https://picsum.photos/id/1015/800/500",
    "https://picsum.photos/id/201/800/500",
    "https://picsum.photos/id/237/800/500",
    "https://picsum.photos/id/870/800/500",
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const startPrediction = () => {
        navigate("/predict");
    };

    return (
        <main className="py-5">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Slideshow */}
                        <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                            <img
                                src={images[currentSlide]}
                                alt="Slideshow"
                                className="img-fluid"
                                style={{
                                    height: "390px",
                                    objectFit: "cover",
                                    transition: "0.5s ease",
                                }}
                            />
                        </div>

                        {/* User Info */}
                        <div className="text-center mt-4">
                            <h2 className="fw-bold mb-2">
                                Nadiyah Shofa Salsabila
                            </h2>

                            <p className="text-muted fs-5">
                                NIM : 221111320
                            </p>
                        </div>

                        {/* Button */}
                        <div className="text-center mt-4">
                            <button
                                onClick={startPrediction}
                                className="btn btn-primary btn-lg px-5 py-2 rounded-pill shadow"
                            >
                                START
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}