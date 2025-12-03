// DriverBarGroup.jsx
import React, { useEffect, useState, useContext } from 'react';
import { calculateStandardScores } from "../scoringSystems/f1Scoring";
import MyContext from "./contexts/MyContext";
import DriverBar from './DriverBar';
import Dropdown from 'react-bootstrap/Dropdown';

const DriverBarGroup = () => {
    const {
        results, setResults,
        drivers, setDrivers,
        driverInfo, setDriverInfo,
        error, setError,
        setIsLoading,
        isLoading,
        year, setYear,
        system, setSystem,
        customSystem, setCustomSystem
    } = useContext(MyContext);

    async function fetchResults() {
        try {
            const resp = await fetch(`https://api.openf1.org/v1/sessions?year=${year}&session_name=Race&session_name=Sprint`);
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function fetchWithRetry(url, retries = 5, delayMs = 500) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                return data;
            } catch (err) {
                console.warn(`Attempt ${attempt} failed for ${url}: ${err}`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                } else {
                    throw err; // give up after max retries
                }
            }
        }
    }

    useEffect(() => {
        if (results.length > 0 || driverInfo.size > 0) return;
        setIsLoading(true);
        fetchResults();

    }, []);

    useEffect(() => {
        setIsLoading(true);
        setResults([]);
        setDrivers(new Map());
        setDriverInfo(new Map());
        fetchResults();
    }, [year, system]);

    useEffect(() => {

        if (results.length === 0 || driverInfo.size > 0) return;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const driverMap = new Map();
        const driverInfoMap = new Map();

        async function fetchDrivers() {
            // Sort sessions by date to ensure consistent order
            const sortedResults = [...results].sort(
                (a, b) => new Date(a.date_start) - new Date(b.date_start)
            );

            for (const session of sortedResults) {
                const sessionKey = session.session_key;

                try {
                    // --- Fetch session results ---
                    const resultUrl = `https://api.openf1.org/v1/session_result?session_key=${sessionKey}`;
                    const resultData = await fetchWithRetry(resultUrl);

                    if (!Array.isArray(resultData)) continue;

                    // --- Fetch driver info (bulk for session) ---
                    const driversUrl = `https://api.openf1.org/v1/drivers?session_key=${sessionKey}`;
                    const driverData = await fetchWithRetry(driversUrl);
                    const sessionDriverMap = new Map();

                    if (Array.isArray(driverData)) {
                        for (const d of driverData) {
                            sessionDriverMap.set(d.driver_number, d);
                        }
                    }

                    // --- Process all drivers in this session ---
                    for (const entry of resultData) {
                        const driverNum = entry.driver_number;
                        const posStr =
                            session.session_name.toLowerCase() === "sprint"
                                ? entry.position + "s"
                                : entry.position;

                        // add to driverMap
                        if (!driverMap.has(driverNum)) {
                            driverMap.set(driverNum, [posStr]);
                        } else {
                            driverMap.get(driverNum).push(posStr);
                        }

                        // add driver info once
                        if (!driverInfoMap.has(driverNum)) {
                            const d = sessionDriverMap.get(driverNum);
                            if (d) {
                                driverInfoMap.set(driverNum, {
                                    name: d.full_name || `${d.first_name} ${d.last_name}`,
                                    team: d.team_name,
                                    color: d.team_colour,
                                });
                            }
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching session ${sessionKey}:`, err);
                }

                await delay(400);
            }

            setDrivers(driverMap);
            setDriverInfo(driverInfoMap);
            setIsLoading(false);
        }

        fetchDrivers();
    }, [results]);


    if (error) return <div>Error: {error}</div>;

    let scores = [];
    if(system === "F1"){
        scores = calculateStandardScores(drivers, [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]);
    }else if(system === "Nascar"){
         scores = calculateStandardScores(drivers, [40,35,34,33,32,31,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,1,1,1,1]);
    }else if(system === "MarioKart"){
         scores = calculateStandardScores(drivers, [15, 12, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1]);
    }else if(system === "Custom"){
         scores = calculateStandardScores(drivers, customSystem);
    }
    const maxPoints = Math.max(...scores.values());
    return (
        <div style={{ padding: 20, color: "white" }}>
            <div style={{
                padding: 20,
                color: "white",
                display: "flex",
                justifyContent: "center",
                gap: "1rem"
            }}>
                <div>Year</div>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setYear(2025)}>2025</Dropdown.Item>
                        <Dropdown.Item onClick={() => setYear(2024)}>2024</Dropdown.Item>
                        <Dropdown.Item onClick={() => setYear(2023)}>2023</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div>Scoring System</div>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        {system}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSystem("F1")}>F1 (No fastest lap point)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSystem("Nascar")}>Nascar</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSystem("MarioKart")}>Mario Kart</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSystem("Custom")}>Custom System</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {!isLoading ? <div style={{ padding: 20 }} >Driver Standings ({year})</div> : <div style={{ padding: 20 }}>Results Loading...</div>}

            {[...scores.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(([driverNum, totalPoints]) => {
                    const info = driverInfo.get(driverNum);
                    const color = info?.color ? `#${info.color}` : "#888";

                    return (
                        <DriverBar
                            key={driverNum}
                            name={info?.name || `Driver ${driverNum}`}
                            driverNum={driverNum}
                            totalPoints={totalPoints}
                            color={color}
                            maxPoints={maxPoints}
                        />
                    );
                })}
        </div>
    );

};

export default DriverBarGroup;
