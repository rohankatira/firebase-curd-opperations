// src/components/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authslice";
import { showToast } from "../utils/toast";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(result.user));
      showToast("Account created successfully!", "success");
    } catch (err) {
      showToast("Signup failed: " + err.message, "danger");
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="mb-4 text-center">
          <FaUserPlus className="me-2" />
          Sign Up for Book Manager
        </h4>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={show ? "text" : "password"}
                required
                className="form-control"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <button className="btn btn-success w-100">
            <FaUserPlus className="me-2" />
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <button className="btn btn-link p-0" onClick={onSwitch}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
