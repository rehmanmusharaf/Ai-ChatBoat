import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import aiLogo from "../assets/aiLogo.png";
import axios from "axios";
const serverUrl = import.meta.env.VITE_APP_SERVER;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("response is:", data);
      // Perform login logic (await if needed)
      // Example
      // navigate('/mainpage'); // Navigate to /mainpage on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#BAD5FF]/50 to-[#92e0f7]/50 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <img className="h-16 mb-4 rounded-full" src={aiLogo} alt="AI Logo" />
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-gray-700">Remember me</label>
          </div>
          <Link
            to="/signup"
            className="text-blue-500 ml-3 text-[0.75rem] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleLoginSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
