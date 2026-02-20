import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { REGISTRATION_URL } from "../../lib/api";
import "./Registration.css";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(REGISTRATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/tasks");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegistration}>
        <h2 className="register-title">Registrazione</h2>

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" type="submit">
          Registrati
        </button>

        <p className="register-text">
          Hai già un account?{" "}
          <Link className="register-link" to="/login">
            Accedi
          </Link>
        </p>
      </form>
    </div>
  );
}
