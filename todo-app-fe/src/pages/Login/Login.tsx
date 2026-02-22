import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LOGIN_URL } from "../../lib/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    navigate(data.user.role === "admin" ? "/admin" : "/tasks");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Accedi
        </button>

        <p className="login-text">
          Non hai un account?{" "}
          <Link className="login-link" to="/register">
            Registrati
          </Link>
        </p>
      </form>
    </div>
  );
}
