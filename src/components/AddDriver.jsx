import NavBar from './NavBar'
import React, { useEffect, useState, useContext } from 'react';
import MyContext from "./contexts/MyContext";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Footer from "./Footer";

export default function AddDriver() {
    const {
        customDrivers, setCustomDrivers,
        setIsLoading
    } = useContext(MyContext);

    const [name, setName] = useState("");
    const [points, setPoints] = useState("");

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleAddDriver = () => {
        if (!name || !points) return;

        const pts = Number(points);

        const updated = new Map(customDrivers);
        updated.set(name, pts);

        setCustomDrivers(updated);
        setName("");
        setPoints("");
    };

    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <NavBar />
            
            <div style={{ color: "white", fontSize: "1.4rem", marginTop: "20px" }}>
                Add Driver
            </div>
            <div style={{ color: "white", marginBottom: "20px" }}>
                Add a custom driver and point total
            </div>

            <Container style={{ maxWidth: "400px" }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Driver name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Points"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" className="w-100" onClick={handleAddDriver}>
                        Add Driver
                    </Button>
                </Form>
            </Container>
            <Footer></Footer>
        </div>
    );
}
