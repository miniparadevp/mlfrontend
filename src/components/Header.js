import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleNavClick = () => {
    // Get the navbar toggler and collapse elements
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Check if the navbar is expanded (visible in mobile view)
    if (navbarCollapse.classList.contains("show")) {
      // Programmatically click the toggler to collapse the navbar
      navbarToggler.click();
    }
  };

  return (
    <header className="header-section">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link
            className="navbar-brand text-white fw-bold fs-3"
            to="/"
            onClick={handleNavClick}
          >
            <div className="brand-wrapper">
              <i className="fas fa-heartbeat brand-icon"></i>
              <span className="brand-text">Medicine Prediction</span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavClick}>
                  <i className="fas fa-home nav-icon"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/predict"
                  onClick={handleNavClick}
                >
                  <i className="fas fa-stethoscope nav-icon"></i>
                  <span>Predict</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={handleNavClick}>
                  <i className="fas fa-info-circle nav-icon"></i>
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  onClick={handleNavClick}
                >
                  <i className="fas fa-envelope nav-icon"></i>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
