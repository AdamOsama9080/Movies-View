import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="home">Movia</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.userdata?<>
          <ul className="navbar-nav">
            <li className="nav-item">
                <Link className='nav-link ' to={"home"}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link ' to={"people"}>People</Link>
            </li>            
            <li className="nav-item">
                <Link className='nav-link ' to={"tv"}>Tv Show</Link>
            </li>            
            <li className="nav-item">
                <Link className='nav-link ' to={"movies"}>Movies</Link>
            </li>       
        </ul></>:""}
      </div>
      <div className="collapse navbar-collapse x" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
            <li className='nav-item d-flex align-items-center order-last order-lg-first'>
              <i class="fab fa-facebook mx-2"></i>
              <i class="fab fa-twitter mx-2"></i>
              <i class="fab fa-youtube mx-2"></i>
              <i class="fab fa-linkedin mx-2"></i>
            </li>
            {props.userdata?<>
            <li className="nav-item">
                <span onClick={props.userlogout} className='nav-link order-first order-lg-last'>Logout</span>
            </li> 
            </>:<>
            <li className="nav-item">
                <Link className='nav-link order-first order-lg-last' to={"login"}>Login</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link order-first order-lg-last' to={"register"}>Register</Link>
            </li>
            </>}     
        </ul>
      </div>
    </div>
  </nav>
  )
}
