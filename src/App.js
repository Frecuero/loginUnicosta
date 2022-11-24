import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Solicitud from "./components/Solicitud";
import { auth } from "./firebase"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      (user) ? setIsAuthenticated(user) : setIsAuthenticated(null)
    })
  }, [])

  return isAuthenticated !== false ? (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar isAuthenticated={isAuthenticated}/>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="solicitudes" element={<Solicitud/>}/>
          </Routes>
        </div>
      </Router> 
    </div>
  )
  :
  (<p>Loading...</p>)
}

export default App; 
