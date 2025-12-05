import React from "react";
import Button from "react-bootstrap/Button";

export default function OpenF1Button({ onClick }) {
    return (
        <Button
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(90deg, #FF1E00, #1828B8)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontFamily: "'Orbitron', sans-serif",
                padding: "6px 12px",
                borderRadius: "6px",
                transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            OpenF1 API
        </Button>
    );
}
