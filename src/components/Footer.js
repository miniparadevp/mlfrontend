import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Medicine Prediction Project</h5>
            <p className="text-light">
              An intelligent healthcare system using machine learning to predict potential medical conditions based on symptoms.
            </p>
          </div>
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Key Features</h5>
            <ul className="list-unstyled footer-list">
              <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i>Symptom-based prediction</li>
              <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i>ML-powered analysis</li>
              <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i>Healthcare decision support</li>
              <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i>User-friendly interface</li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="text-white mb-4">Technical Details</h5>
            <ul className="list-unstyled footer-list">
              <li><i className="fas fa-code me-2" style={{ color: 'var(--accent)' }}></i>React.js Frontend</li>
              <li><i className="fas fa-brain me-2" style={{ color: 'var(--accent)' }}></i>ML Model Integration</li>
              <li><i className="fas fa-database me-2" style={{ color: 'var(--accent)' }}></i>Extensive Medical Dataset</li>
              <li><i className="fas fa-shield-alt me-2" style={{ color: 'var(--accent)' }}></i>Secure Processing</li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-light">
              © 2024 Medicine Prediction Project. All rights reserved. 
              <span className="developer-info ms-2">
                Developed by <a href="https://github.com/devminipara" target="_blank" rel="noopener noreferrer" className="text-success fw-bold">Dev Minipara</a>
              </span>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="social-links">
              <a href="https://github.com/devminipara" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/dev-minipara-5b4b28269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/devminipara" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 