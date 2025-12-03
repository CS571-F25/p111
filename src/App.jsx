import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, HashRouter, Routes } from "react-router-dom";
import Home from './components/Home'
import NavBar from './components/NavBar'
import ScoringBuilder from './components/ScoringBuilder'
import AddDriver from './components/AddDriver'
import MyContext from "./components/contexts/MyContext";

function App() {

  const [results, setResults] = useState([]);
  const [drivers, setDrivers] = useState(new Map());
  const [driverInfo, setDriverInfo] = useState(new Map());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState("2025");
  const [system, setSystem] = useState("F1");
  const [customSystem, setCustomSystem] = useState([25, 18, 15, 12, 10, 8, 6, 4, 2, 1,0,0,0,0,0,0,0,0,0,0]);


  return (
    <MyContext.Provider value={{
      results, setResults,
      drivers, setDrivers,
      driverInfo, setDriverInfo,
      error, setError,
      isLoading, setIsLoading,
      year, setYear,
      system, setSystem,
      customSystem, setCustomSystem
    }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoringBuilder" element={<ScoringBuilder />} />
          <Route path="/addDriver" element={<AddDriver />} />
        </Routes>
      </HashRouter>
    </MyContext.Provider>
  );
}
export default App
