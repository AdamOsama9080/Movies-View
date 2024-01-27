import React from 'react'

export default function Notfound() {
  return (
    <div className="container mt-5">
        <div className="jumbotron text-center">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <a className="btn btn-primary" href="/">Go to Home</a>
        </div>      
    </div>
  )
}
