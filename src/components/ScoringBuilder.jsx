import NavBar from './NavBar'
import React, { useEffect, useState, useContext } from 'react';
import MyContext from "./contexts/MyContext";

export default function ScoringBuilder() {
    const {
        results, setResults,
        drivers, setDrivers,
        driverInfo, setDriverInfo,
        error, setError,
        setIsLoading
    } = useContext(MyContext);

    console.log("AAAA", Array.from(driverInfo.entries()));
    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <NavBar />
            <div>Scoring Builder</div>

        </div>
    );
}