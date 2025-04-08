"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "../_utils/auth"; // Imports login and signup functions from auth.js for Firebase authentication

export default function AuthPage() {
  // State to go between Login and Signup (true = Login, false = Signup)
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    //Full-screen, centered layout with a light blue background
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">
          {isLogin ? "Login" : "Create Account"}
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded ${
              isLogin ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded ${
              !isLogin ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Create Account
          </button>
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

//Handles user login functionality
function LoginForm() {
  //Email and password, plus a icon for password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //Password visibility
  const router = useRouter();

  //Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded text-black" 
          required
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded text-black" 
          required
        />
        {/* Login account page password toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Path for "hide password" icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Path for "show password" icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
      >
        Login
      </button>
    </form>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, username, password);
      router.push("/");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded text-black" 
          required
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded text-black" 
          required
        />
        {/* Create account page password toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
      >
        Create Account
      </button>
    </form>
  );
}