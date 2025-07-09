// src/App.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./features/auth/authslice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import BookManager from "./components/BookManager";
import BooksList from "./components/BooksList";
import AuthPage from "./components/AuthPage";

import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setUser(user));
      else dispatch(clearUser());
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          {!user ? (
            // Show login/register when not authenticated
            <Route path="*" element={<AuthPage />} />
          ) : (
            // Show protected routes when authenticated
            <>
              <Route path="/" element={<BookManager />} />
              <Route path="/books" element={<BooksList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
