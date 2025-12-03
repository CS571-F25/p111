import NavBar from './NavBar'
import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import MyContext from "./contexts/MyContext";

export default function ScoringBuilder() {
    const {
        results, setResults,
        drivers, setDrivers,
        driverInfo, setDriverInfo,
        error, setError,
        setIsLoading,
        customSystem, setCustomSystem
    } = useContext(MyContext);

    const handleChange = (index, newValue) => {
        const updated = [...customSystem];
        updated[index] = parseInt(newValue);
        setCustomSystem(updated);
    };

    return (
        <div style={{ padding: 20, color: "white" }}>
            <NavBar/>
            <h1 style={{padding: 20}}>Enter Points per Position</h1>
            <h2 style={{padding: 20}}>Select "Custom Score" in Home to view your system</h2>

            <Form>
                <Row className="g-3">
                    {customSystem.map((val, i) => (
                        <Col xs={2} md={1} key={i}>
                            <h2>{i + 1}</h2>
                            <Form.Control
                                type="text"
                                value={val}
                                placeholder={`Input ${i + 1}`}
                                onChange={(e) => handleChange(i, e.target.value)}
                            />
                        </Col>
                    ))}
                </Row>

            </Form>
        </div>
    );
}