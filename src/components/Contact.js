import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "Name can only contain letters and spaces";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return "Invalid email address";
        }
        return "";

      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 5)
          return "Subject must be at least 5 characters";
        if (value.trim().length > 100)
          return "Subject must be less than 100 characters";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        if (value.trim().length > 1000)
          return "Message must be less than 1000 characters";
        return "";

      default:
        return "";
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live validation
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (validateForm()) {
      setSubmitStatus("submitting");
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
        setSubmitStatus("success");
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } catch (error) {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const getFieldClassName = (fieldName) => {
    return `form-control ${
      touched[fieldName] ? (errors[fieldName] ? "is-invalid" : "is-valid") : ""
    }`;
  };

  return (
    <div className="contact-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="mb-4" style={{ color: "var(--primary)" }}>
              Contact Us
            </h2>
            <div className="contact-info">
              <div className="info-item mb-4">
                <i
                  className="fas fa-map-marker-alt me-3"
                  style={{ color: "var(--primary)" }}
                ></i>
                <div>
                  <h5 className="mb-2">Address</h5>
                  <p className="text-muted mb-0">Darshan University, Rajkot</p>
                </div>
              </div>
              <div className="info-item mb-4">
                <i
                  className="fas fa-phone me-3"
                  style={{ color: "var(--primary)" }}
                ></i>
                <div>
                  <h5 className="mb-2">Phone</h5>
                  <p className="text-muted mb-0">+91 8849425770</p>
                </div>
              </div>
              <div className="info-item mb-4">
                <i
                  className="fas fa-envelope me-3"
                  style={{ color: "var(--primary)" }}
                ></i>
                <div>
                  <h5 className="mb-2">Email</h5>
                  <p className="text-muted mb-0">
                    contact@medicinepredictbydevminipara.com
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i
                  className="fas fa-clock me-3"
                  style={{ color: "var(--primary)" }}
                ></i>
                <div>
                  <h5 className="mb-2">Working Hours</h5>
                  <p className="text-muted mb-0">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3
                  className="card-title mb-4"
                  style={{ color: "var(--primary)" }}
                >
                  Send us a Message
                </h3>
                {submitStatus === "success" && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Sorry, there was an error sending your message. Please try
                    again.
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={getFieldClassName("name")}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={submitStatus === "submitting"}
                    />
                    {touched.name && errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={getFieldClassName("email")}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={submitStatus === "submitting"}
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={getFieldClassName("subject")}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={submitStatus === "submitting"}
                    />
                    {touched.subject && errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={getFieldClassName("message")}
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={submitStatus === "submitting"}
                    ></textarea>
                    {touched.message && errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={submitStatus === "submitting"}
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <i className="fas fa-paper-plane ms-2"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
