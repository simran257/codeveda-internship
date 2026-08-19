import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

// LOGIN

const handleLogin = async (e) => {
e.preventDefault();
setMessage("");
setError("");
setLoading(true);
try {
const response = await fetch("http://localhost:5000/api/auth/login",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email: email.trim(),
password,
}),
}
);
const data = await response.json();

// LOGIN FAILED
if (!response.ok) {
setError(
data.message || "Login failed"
);
setLoading(false);
return;
}

// CHECK TOKEN
if (!data.token) {
setError("Login successful, but token was not received."
);
setLoading(false);
return;
}

// SAVE JWT TOKEN
      
localStorage.setItem(
"token",
data.token
);
if (data.student) {
localStorage.setItem(
"student",
JSON.stringify(data.student)
);
}

// SUCCESS MESSAGE

setMessage(
data.message ||"Login successful ✅");
setLoading(false);
setTimeout(() => {
navigate("/dashboard");
}, 1000);
} catch (error) {
console.error("Login Error:",error);
setError("Unable to connect to server. Please make sure backend is running.");
setLoading(false);
}
};
return (
<section className="auth-section">
<div className="auth-card">
<h2>Student Login</h2>
<p className="subtitle">Login to your student account</p>

{/* SUCCESS MESSAGE */}
{message && (<p className="success-message">
{message}</p>)}

{/* ERROR MESSAGE */}
{error && (
<p className="error-message">
{error}
</p>
)}
<form onSubmit={handleLogin}>

{/* EMAIL */}
<div className="form-group">
<label>Email</label>
<input type="email"placeholder="Enter your email"value={email}onChange={(e) =>setEmail(e.target.value)}required/>
</div>

{/* PASSWORD */}
<div className="form-group">
<label>Password</label>
<input type="password"placeholder="Enter your password"value={password}onChange={(e) =>setPassword(e.target.value)}required/>
</div>

{/* LOGIN BUTTON */}
<button type="submit"className="primary-btn"disabled={loading}>{loading? "Logging in...": "Login"}</button>
</form>

{/* REGISTER LINK */}
<p className="form-footer">
Don't have an account?{" "}
<Link to="/register">Register here</Link>
</p>
</div>
</section>
);
}
export default Login;