import NavBar from './NavBar'
import React, { useEffect, useState, useContext } from 'react';
import MyContext from "./contexts/MyContext";

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

        // Clone the Map, add new entry
        const updated = new Map(customDrivers);
        updated.set(name, pts);

        setCustomDrivers(updated);

        // Clear inputs
        setName("");
        setPoints("");
    };

    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <NavBar />
            <div style={{ color: "white" }}>Add Driver</div>
            <div style={{ color: "white" }}>Add a custom driver and point total</div>

            <div style={{ marginTop: "20px" }}>
                <input
                    style={{ padding: "6px", marginRight: "8px" }}
                    placeholder="Driver name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    style={{ padding: "6px", marginRight: "8px" }}
                    placeholder="Points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />

                <button onClick={handleAddDriver}>
                    Add Driver
                </button>
            </div>
        </div>
    );
}
