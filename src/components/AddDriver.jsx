import NavBar from './NavBar'
import React, { useEffect, useState, useContext } from 'react';
import MyContext from "./contexts/MyContext";

export default function AddDriver() {
    const {
        results, setResults,
        drivers, setDrivers,
        driverInfo, setDriverInfo,
        error, setError,
        setIsLoading
    } = useContext(MyContext);

    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <NavBar />
            <div style={{color:"white"}}>Add Driver</div>
            <div style={{color:"white"}}>Here the use will be able to add a custom driver with a custom number of points</div>

        </div>
    );
}