"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../_utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../_utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-500">JeoparTrivia</h1>
        <ul className="flex gap-4 items-center">
          <li>
            <Link href="/" className="hover:text-pink-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/categories" className="hover:text-pink-500">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-pink-500">
              Profile
            </Link>
          </li>
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/auth" className="hover:text-pink-500">
                Login / Sign Up
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;