// DriverBarGroup.jsx
import React, { useEffect, useState } from 'react';
import { calculateF1StandardScores } from "../scoringSystems/f1Scoring";

const DriverBarGroup = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState(new Map());
    const [driverInfo, setDriverInfo] = useState(new Map());


    useEffect(() => {
        async function fetchResults() {
            try {
                // Replace this URL with your actual API endpoint
                const resp = await fetch('https://api.openf1.org/v1/sessions?year=2025&session_name=Race&session_name=Sprint');
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                const data = await resp.json();
                setResults(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchResults();
    }, []);

useEffect(() => {
    if (results.length === 0) return;

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
                const resultResp = await fetch(resultUrl);
                if (!resultResp.ok) {
                    console.warn(`Skipping session ${sessionKey}, got ${resultResp.status}`);
                    continue;
                }
                const resultData = await resultResp.json();
                if (!Array.isArray(resultData)) continue;

                // --- Fetch driver info (bulk for session) ---
                const driversUrl = `https://api.openf1.org/v1/drivers?session_key=${sessionKey}`;
                const driverResp = await fetch(driversUrl);
                const driverData = await driverResp.json();
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

            await delay(400); // slow down to avoid 429
        }

        // ✅ Now that all sessions are processed, update React state once
        setDrivers(driverMap);
        setDriverInfo(driverInfoMap);
        console.log("✅ Final driverMap:", driverMap);
    }

    fetchDrivers();
}, [results]);






    if (loading) return <div>Loading race results…</div>;
    if (error) return <div>Error: {error}</div>;

    const scores = calculateF1StandardScores(drivers);
    console.log(scores);



    return (
        <div style={{ padding: 20, color: "white" }}>
            <h2>Driver Standings (2024)</h2>

            {[...scores.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(([driverNum, totalPoints]) => {
                    const info = driverInfo.get(driverNum);
                    const color = info?.team_colour ? `#${info.team_colour}` : "#888";

                    return (
                        <div
                            key={driverNum}
                            style={{
                                border: `2px solid ${color}`,
                                borderRadius: 8,
                                marginBottom: 10,
                                padding: 10
                            }}
                        >
                            <h3 style={{ color }}>
                                {info.name} {driverNum}
                            </h3>
                            <p style={{ fontWeight: "bold" }}>{totalPoints} pts</p>
                        </div>
                    );
                })}
        </div>
    );

};

export default DriverBarGroup;
