import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#222",
                color: "white",
                padding: "12px 0",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
                zIndex: 1000
            }}
        >
            <Container>
                <small>© {new Date().getFullYear()} Racing What If's</small>

                <div>
                    <small style={{ color: "#aaaaaa" }}>
                        Built with React & OpenF1 API
                    </small>
                </div>
            </Container>
        </footer>
    );
}
