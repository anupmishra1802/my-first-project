import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authStart, authSuccess, authFailure } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(authStart());

    try {
      // Debugging - check what we're sending
      console.log("📤 Sending login request:", {
        email: form.email,
        password: form.password
      });

      const res = await axios.post(`${BASE_URL}/auth/login`, form);

      // Debugging - check full response
      console.log("📥 Full login response:", res.data);

      // ✅ UPDATED: New response structure
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;
      const user = res.data.data.user;

      if (accessToken) {
        // ✅ Save both tokens
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        
        dispatch(authSuccess(user));
        setMessage("Login successful! Welcome " + user.name);
        
        // Small delay for better UX
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        throw new Error("Access token missing in response");
      }
    } catch (err) {
      console.error("❌ Login error details:", err);
      
      // Better error message
      let errorMsg = "Login failed";
      
      if (err.response?.status === 401) {
        errorMsg = "Invalid email or password";
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      dispatch(authFailure(errorMsg));
      setMessage(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      
      {/* Debug Info */}
      <div style={styles.debugInfo}>
        <p style={styles.debugText}>🔍 Check browser console for details</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = "#ff5fa3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ff7eb3"}
        >
          Login
        </button>
      </form>

      <div style={styles.registerLink}>
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here first
          </Link>
        </p>
      </div>

      {message && (
        <p style={{
          ...styles.message,
          color: message.includes("successful") ? "#4ade80" : "#f87171"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "40px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: { 
    fontSize: "32px", 
    marginBottom: "10px",
    fontWeight: "bold"
  },
  debugInfo: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  debugText: {
    fontSize: "12px",
    margin: "0",
    opacity: "0.8"
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px" 
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff7eb3",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px"
  },
  message: { 
    marginTop: "15px", 
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  registerLink: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
  },
  registerText: {
    margin: "0",
    fontSize: "16px",
  },
  link: {
    color: "#ff7eb3",
    fontWeight: "bold",
    textDecoration: "none",
  },
};