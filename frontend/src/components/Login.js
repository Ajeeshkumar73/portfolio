import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import API_URL from "../config";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/portfolio/login/`,
        {
          username,
          password,
        },
      );

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/profile");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface border border-outline/10 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-outline/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-outline/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
