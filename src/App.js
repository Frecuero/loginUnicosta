import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Solicitud from "./components/Solicitud";


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="solicitudes" element={<Solicitud/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App; 
