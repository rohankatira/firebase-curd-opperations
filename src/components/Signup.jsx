// src/components/Signup.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authslice";
import { showToast } from "../utils/toast";

import {
  FaBookOpen,
  FaBook,
  FaBookReader,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaGoogle,
} from "react-icons/fa";

import "../components/Signup.css";

const Signup = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(result.user));
      showToast("Account created successfully!", "success");
    } catch (err) {
      showToast("Signup failed: " + err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user));
      showToast("Signed up with Google!", "success");
    } catch (error) {
      showToast("Google signup failed: " + error.message, "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-container">
        <FaBookOpen className="book-decoration book-1" />
        <FaBook className="book-decoration book-2" />

        <div className="logo-container">
          <div className="logo-icon">
            <FaBookReader />
          </div>
          <h1 className="logo-text">BookVault</h1>
          <p className="logo-subtext">Create Your Account</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
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
                placeholder="Create a password"
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
            {loading ? "Signing up..." : (
              <>
                <FaUserPlus className="me-2" /> Sign Up
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-danger w-100 mb-3"
            onClick={handleGoogleSignup}
          >
            <FaGoogle className="me-2" /> Sign up with Google
          </button>

          <div className="text-center form-footer">
            Already have an account?{" "}
            <button className="btn btn-link p-0" onClick={onSwitch}>
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
