import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase"

const Navbar = (props) => {
    const navigate = useNavigate()
    const cerrarSesion = ()=>{
        auth.signOut()
        .then(()=>{
            navigate("/login")
        })   
    }

  return (
    <div className="container">
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> </a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar