// src/components/AuthPage.jsx
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return isLogin ? (
    <Login onSwitch={toggleForm} />
  ) : (
    <Signup onSwitch={toggleForm} />
  );
};

export default AuthPage;