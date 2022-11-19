import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar/>
          <Routes>
            <Route path="/" element={""}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
