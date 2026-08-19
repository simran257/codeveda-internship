import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
phone: "",
course: "",
bio: "",
});

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({
...formData,
[name]: value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! 🎉");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        course: "",
        bio: "",
      });

      // Redirect to Login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">

        <h2>Create Account</h2>

        <p className="subtitle">
          Register as a new student
        </p>

        {/* Success Message */}
        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Course */}
          <div className="form-group">
            <label>Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Course
              </option>

              <option value="Computer Science">
                Computer Science
              </option>

              <option value="Information Technology">
                Information Technology
              </option>

              <option value="Software Engineering">
                Software Engineering
              </option>

              <option value="Data Science">
                Data Science
              </option>
            </select>
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something about yourself"
              rows="3"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

<p className="form-footer">
Already have an account?{" "}
<Link to="/login">
Login here
</Link>
</p>
</div>
</section>
);
}
export default Register;