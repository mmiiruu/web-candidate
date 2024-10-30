import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./css/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLogin(userCredential.user);
      navigate("/year"); // นำทางไปยังหน้า /year หลังล็อกอินสำเร็จ
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="body-login">
      <div className="Login-form">
        <h2 className="Login">Login</h2>
        <form onSubmit={handleLogin} class="mb-3 form">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            class="form-control bon"
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="inputPassword5" class="form-label">
            Password
          </label>
          <input
            class="form-control bon"
            type="password"
            placeholder="adminadmin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" class="btn btn-success Login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
