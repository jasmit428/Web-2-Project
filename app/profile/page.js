"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // aiana will cotinue the auth tomorrow
    //fetch the user data using firebase authentication
    const mockUser = {
      name: "Aiana Sevilla",
      email: "aianasevilla@gmail.com",
      gamesPlayed: 99,
      highScore: 6500,
    };

    setUser(mockUser);
  }, []);

  const handleLogout = () => {
    //logout button
    alert("Logged out successfully!");
    router.push("/"); //return to homepage on logout
  };

  if (!user) {
    return <p className="text-center mt-20 text-purple-600">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-600">User Profile</h1>
        <p className="text-lg text-gray-700 mt-2">{user.name}</p>
        <p className="text-md text-gray-500">{user.email}</p>

        {/* User Stats */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-800">Games Played: {user.gamesPlayed}</p>
          <p className="text-lg font-semibold text-gray-800">High Score: {user.highScore}</p>
        </div>

        {/* View Leaderboard Button */}
        <div className="mt-6">
          <Link href="/leaderboard"> 
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              View Leaderboard 
            </button>
          </Link>
        </div>
      </div>

      {/* Logout Button (Separate from Profile Card) */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
