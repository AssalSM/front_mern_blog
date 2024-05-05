import React from 'react'
import { Link } from 'react-router-dom'
import "./notfound.css"
function NotFound() {
  return (
    <section className="notfound" >
        <div className="notfoundtlt">404</div>
        <div className="notfoundt">page not found</div>
        <Link className="notfoundlink" to="/">
        go to home page
        </Link>
    </section>
  )
}

export default NotFound