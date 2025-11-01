import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, HashRouter, Routes } from 'react-router'
import Home from './components/Home'
import NavBar from './components/NavBar'

function App() {

  return <HashRouter >
    <Routes>
      <Route path = "/" element ={<Home/>}></Route>
    </Routes>
  </HashRouter>
}
export default App
