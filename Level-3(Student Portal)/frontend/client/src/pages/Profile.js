import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // GET PROFILE
  // ===============================

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/students/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Unable to load profile"
          );
          return;
        }

        const studentData = data.student;

        setStudent(studentData);

        setName(studentData.name || "");
        setPhone(studentData.phone || "");
        setCourse(studentData.course || "");
        setBio(studentData.bio || "");

      } catch (error) {
        console.error(
          "Profile Error:",
          error
        );

        setError(
          "Unable to connect to server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);


  // ===============================
  // UPDATE PROFILE
  // ===============================

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/profile",
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            phone,
            course,
            bio,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Profile update failed"
        );

        setSaving(false);
        return;
      }

      setStudent(data.student);

      // Update localStorage student data
      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      setMessage(
        "Profile updated successfully ✅"
      );

    } catch (error) {
      console.error(
        "Update Profile Error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setSaving(false);
    }
  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <section className="profile-page">
        <h2>Loading Profile...</h2>
      </section>
    );
  }


  // ===============================
  // PROFILE PAGE
  // ===============================

  return (
    <section className="profile-page">

      <div className="profile-container">

        {/* Header */}

        <div className="profile-header">

          <button
            className="back-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Dashboard
          </button>

          <h2>My Profile</h2>

        </div>


        {/* Messages */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* Profile Form */}

        {student && (
          <form
            className="profile-form"
            onSubmit={handleUpdate}
          >

            {/* Name */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                value={student.email}
                disabled
              />

              <small>
                Email cannot be changed.
              </small>

            </div>


            {/* Phone */}

            <div className="form-group">

              <label>
                Phone
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter phone number"
              />

            </div>


            {/* Course */}

            <div className="form-group">

              <label>
                Course
              </label>

              <select
                value={course}
                onChange={(e) =>
                  setCourse(e.target.value)
                }
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

              <label>
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                placeholder="Tell something about yourself"
                rows="5"
              />

            </div>


            {/* Buttons */}

            <div className="profile-actions">

              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Update Profile"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Cancel
              </button>

            </div>

          </form>
        )}

      </div>

    </section>
  );
}

export default Profile;