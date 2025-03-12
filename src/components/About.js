import React from 'react';

function About() {
  return (
    <div className="project-info-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto text-center mb-5 fade-in">
            <h2 className="section-title mb-4" style={{ color: 'var(--primary)' }}>About Medicine Prediction System</h2>
            <p className="lead text-muted">
              Our advanced machine learning system helps predict potential medical conditions based on your symptoms, 
              assisting in early detection and healthcare decision-making.
            </p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="info-card h-100">
              <div className="info-card-body">
                <i className="fas fa-robot info-icon"></i>
                <h4 className="mb-3">Machine Learning</h4>
                <p className="text-muted mb-0">Powered by sophisticated machine learning algorithms trained on extensive medical data to provide accurate predictions.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="info-card h-100">
              <div className="info-card-body">
                <i className="fas fa-stethoscope info-icon"></i>
                <h4 className="mb-3">Symptom Analysis</h4>
                <p className="text-muted mb-0">Analyzes multiple symptoms simultaneously to identify potential medical conditions with high accuracy.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="info-card h-100">
              <div className="info-card-body">
                <i className="fas fa-hospital-user info-icon"></i>
                <h4 className="mb-3">Healthcare Support</h4>
                <p className="text-muted mb-0">Assists healthcare professionals and patients in making informed decisions about medical conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 