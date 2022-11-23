import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
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
                    
                    {
                        props.isAuthenticated !== null ? (
                            <button className='btn btn-danger' onClick={cerrarSesion}>Logout</button>
                        ):(
                            <NavLink className='btn btn-primary' to='/login'>Login</NavLink>
                        )
                    }
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar