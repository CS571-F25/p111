// DriverBarGroup.jsx
import React, { useEffect, useState, useContext } from 'react';
import { calculateF1StandardScores } from "../scoringSystems/f1Scoring";
import MyContext from "./contexts/MyContext";
import DriverBar from './DriverBar';

const DriverBarGroup = () => {
    const {
        results, setResults,
        drivers, setDrivers,
        driverInfo, setDriverInfo,
        error, setError,
        setIsLoading
    } = useContext(MyContext);

    async function fetchResults() {
        try {
            const resp = await fetch('https://api.openf1.org/v1/sessions?year=2025&session_name=Race&session_name=Sprint');
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

    const scores = calculateF1StandardScores(drivers);
    const maxPoints = Math.max(...scores.values());
    return (
        <div style={{ padding: 20, color: "white" }}>
            <h2>Driver Standings (2024)</h2>

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
