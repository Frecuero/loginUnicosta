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
        <nav className="navbar " >
            <div className="container-fluid mt-2">
                <a className="navbar-brand" href="/">
                    <img src="https://www.cuc.edu.co/wp-content/uploads/2021/07/logo1cuc.png" height="60px" width='180px' alt="logo cuc" />
                </a>
                <div className='d-flex'>
                    <Link className='btn btn-primary m-2' to='/login'>Login</Link>
                    <Link className='btn btn-primary m-2' to='/inicio'>Inicio</Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar