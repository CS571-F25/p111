import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 20
        }}>
            <Spinner animation="border" variant="light" />
        </div>
    );
}
