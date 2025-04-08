"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "../_utils/firebase";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState({ username: "", email: "", gamesPlayed: 0, highScore: 0 });
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            username: data.username || "Unknown",
            email: user.email || "No email",
            gamesPlayed: data.gamesPlayed || 0, 
            highScore: data.highScore || 0,     
          });
        }
      } else {
        router.push("/auth"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage("No user is logged in.");
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated successfully!");
      setNewPassword("");
    } catch (error) {
      setMessage("Failed to update password: " + error.message);
    }
  };

  if (!userData.username) {
    return <p className="text-center mt-20 text-purple-600">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-600">User Profile</h1>
        <p className="text-lg text-gray-700 mt-2">{userData.username}</p>
        <p className="text-md text-gray-500">{userData.email}</p>

        {/* User Stats */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-800">Games Played: {userData.gamesPlayed}</p>
          <p className="text-lg font-semibold text-gray-800">High Score: {userData.highScore}</p>
        </div>

        {/* Beat Your Score Button */}
        <div className="mt-6">
          <Link href="/categories">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Beat Your High Score!
            </button>
          </Link>
        </div>

        {/* Change Password */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-2 border rounded text-black"
                required
              />
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c-4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
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
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c-4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Update Password
            </button>
          </form>
          {message && (
            <p className="mt-2 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}