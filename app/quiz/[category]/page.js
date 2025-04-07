"use client";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../_utils/firebase";

const difficultyLevels = [100, 200, 300, 400, 500];
const selectedCategories = ["Chemistry", "Biology", "Physics", "Space"];

export default function QuizCategory() {
  const [questions, setQuestions] = useState({});
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const newQuestions = {};

      for (const cat of selectedCategories) {
        const docRef = doc(db, "science_questions", cat);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          newQuestions[cat] = docSnap.data().questions || [];
        } else {
          newQuestions[cat] = [];
        }
      }

      setQuestions(newQuestions);
    };

    fetchQuestions();
  }, []);

  const handleClick = (cat, level) => {
    const key = `${cat}-${level}`;
    setRevealed((prev) => ({
      ...prev,
      [key]: prev[key] === "question" ? "answer" : "question",
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-purple-600">Science Trivia</h1>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <div key="empty-header" />
        {selectedCategories.map((cat) => (
          <div key={`header-${cat}`} className="text-xl font-bold text-center text-purple-800">
            {cat}
          </div>
        ))}

        {difficultyLevels.map((level) => (
          <div key={`row-${level}`} className="contents">
            <div className="text-xl font-bold text-center text-yellow-600">{level}</div>

            {selectedCategories.map((cat) => {
              const key = `${cat}-${level}`;
              const qIndex = Math.floor(level / 100) - 1;
              const data = questions[cat]?.[qIndex] || { question: "No question", answer: "No answer" };

              return (
                <div
                  key={key}
                  className="relative w-32 h-32 bg-blue-600 text-white text-2xl font-bold flex items-center justify-center cursor-pointer rounded-lg hover:bg-blue-700 transition text-center"
                  onClick={() => handleClick(cat, level)}
                >
                  {revealed[key] === "question" ? (
                    <span className="text-lg text-yellow-300 px-2">{data.question}</span>
                  ) : revealed[key] === "answer" ? (
                    <span className="text-lg text-green-300 px-2">{data.answer}</span>
                  ) : (
                    <span>{level}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
