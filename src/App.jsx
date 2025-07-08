// src/App.jsx
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import BookManager from "./components/BookManager";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { setUser, clearUser } from "./features/auth/authslice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/config";

const AppContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setUser(user));
      else dispatch(clearUser());
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = () => signOut(auth);

  if (!user) {
    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onSwitch={() => setShowSignup(true)} />
    );
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">📚 Book Manager</span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>
      </nav>
      <BookManager />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
