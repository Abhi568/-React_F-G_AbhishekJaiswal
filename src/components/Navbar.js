import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {

  const [expandShrink, setExpandShrink] = useState(true)
  const toggle = () => {
    if (expandShrink) {
      setExpandShrink(false)
    }
    else {
      setExpandShrink(true)
      console.log(expandShrink)
    }
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid ms-3">
          <a className="navbar-brand nav-brand-link" href="/">
            Senpiper Technologies
          </a>
          <button
            onClick={toggle}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{ display: expandShrink ? "none" : "block" }} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  FeedBackFrom
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedbacktable">
                  FeedBackTable
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
