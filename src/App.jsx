import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, HashRouter, Routes } from "react-router-dom";
import Home from './components/Home'
import NavBar from './components/NavBar'
import ScoringBuilder from './components/ScoringBuilder'
import MyContext from "./components/contexts/MyContext";

function App() {

  const [results, setResults] = useState([]);
  const [drivers, setDrivers] = useState(new Map());
  const [driverInfo, setDriverInfo] = useState(new Map());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <MyContext.Provider value={{
      results, setResults,
      drivers, setDrivers,
      driverInfo, setDriverInfo,
      error, setError,
      isLoading, setIsLoading
    }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoringBuilder" element={<ScoringBuilder />} />
        </Routes>
      </HashRouter>
    </MyContext.Provider>
  );
}
export default App
