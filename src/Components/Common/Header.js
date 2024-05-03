import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../Styles/Header.css"

export default function Header() {

  const {isError,isLoggin} = useSelector((store)=> store.user);

  return (
    <header className="p-3 text-white header">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          { 
          <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>}
            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
          </ul>
          { 
            (isError || !isLoggin) && 
          <div className="text-end">
            <Link to='/login'>
            <button type="button" className="btn btn-outline-light me-2 mx-3">Login</button>
          </Link>
            <Link to='/register'>
            <button type="button" className="btn btn-warning">Sign-up</button>
            </Link>
          </div>
        
          }
        </div>
      </div>
    </header>
  );
}

