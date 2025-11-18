import NavBar from './NavBar'
import React, { useState } from 'react'
import DriverBarGroup from './DriverBarGroup'

export default function Home() {
    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <NavBar/>
            <DriverBarGroup />
        </div>
    );
}


//So my approach should be|
// 1. Call api to get sessions for a year
// 2. Filter out non-race sessions
// 3. For each session get drivers from the session and their position, then add the name to a hashtable, which will store their total points( we check if the name already exists to prevent unneccesary calls)
// 4. Then we have a table with each driver and their total points