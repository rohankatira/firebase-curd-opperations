// src/components/Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authslice";
import { showToast } from "../utils/toast";

import {
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaBookOpen,
  FaBook,
  FaBookReader,
  FaUser,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import "../components/Login.css";

const Login = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(result.user));
      showToast("Logged in successfully!", "success");
    } catch (err) {
      showToast("Login failed: " + err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user));
      showToast("Signed in with Google!", "success");
    } catch (error) {
      showToast("Google login failed: " + error.message, "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="login-container">
        <FaBookOpen className="book-decoration book-1" />
        <FaBook className="book-decoration book-2" />

        <div className="logo-container">
          <div className="logo-icon">
            <FaBookReader />
          </div>
          <h1 className="logo-text">BookVault</h1>
          <p className="logo-subtext">Your Personal Library Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type={show ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button className="btn btn-login text-white w-100 mb-3" disabled={loading}>
            {loading ? "Logging in..." : <>
              <FaSignInAlt className="me-2" /> Login
            </>}
          </button>

          <button
            type="button"
            className="btn btn-outline-danger w-100 mb-3"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="me-2" /> Sign in with Google
          </button>

          <div className="text-center form-footer">
            Don’t have an account?{" "}
            <button className="btn btn-link p-0" onClick={onSwitch}>
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
