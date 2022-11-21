import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="login" element={<Login/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App; 
