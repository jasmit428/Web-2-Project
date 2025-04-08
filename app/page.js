"use client"; 

import { useState, useEffect } from "react";
import { auth, db } from "./_utils/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username.split(" ")[0]);
        }
      } else {
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen bg-blue-50">
      {username && (
        <div className="absolute top-4 left-4 text-lg font-semibold text-purple-600">
          Hi, {username}!
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex-1 text-center p-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Welcome to JeoparTrivia!
          </h1>
          <p className="text-lg mb-6 text-purple-700">
            Test your knowledge across multiple categories and compete for the highest score!
          </p>
          <div>
            <a
              href="/categories"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg text-lg hover:bg-purple-700 transition"
            >
              Start Playing
            </a>
          </div>
        </div>
        <div className="flex-1 p-8">
          <img
            src="/images/jeopardy-board.png"
            alt="Jeopardy Board"
            className="w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}