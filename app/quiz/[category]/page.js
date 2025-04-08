"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../_utils/firebase";

const difficultyLevels = [100, 200, 300, 400, 500];

export default function QuizCategory() {
  const { category } = useParams();
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const [subcategories, setSubcategories] = useState([]);
  const [questions, setQuestions] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(0);

  const totalQuestions = subcategories.length * difficultyLevels.length;
  const completedCount = Object.values(revealed).filter((val) => val === "scored").length;
  const isGameOver = completedCount === totalQuestions && totalQuestions > 0;

  useEffect(() => {
    const fetchSubcategories = async () => {
      const ref = doc(db, "category_subcategories", formattedCategory);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const subs = snap.data().subcategories;
        setSubcategories(subs.length ? subs : [formattedCategory]);
      } else {
        setSubcategories([formattedCategory]);
      }
    };
    fetchSubcategories();
  }, [formattedCategory]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const all = {};
      for (const sub of subcategories) {
        const ref = doc(db, "all_questions", sub);
        const snap = await getDoc(ref);
        all[sub] = snap.exists() ? snap.data().questions || {} : {};
      }
      setQuestions(all);
    };
    if (subcategories.length) fetchQuestions();
  }, [subcategories]);

  const handleClick = (cat, level) => {
    const key = `${cat}-${level}`;
    if (revealed[key] !== "scored") {
      setRevealed((prev) => ({
        ...prev,
        [key]: prev[key] === "question" ? "answer" : "question",
      }));
    }
  };

  const handleScore = (e, sub, level, isCorrect) => {
    e.stopPropagation();
    const key = `${sub}-${level}`;
    if (isCorrect) {
      setScore((prev) => prev + level);
    }
    setRevealed((prev) => ({ ...prev, [key]: "scored" }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <div className="relative w-full max-w-7xl mx-auto mb-6">
      <div className="absolute top-0 right-0 m-4 px-4 py-2 bg-yellow-200 text-yellow-900 text-lg md:text-xl font-semibold rounded shadow">
        Score: {score} pts
      </div>
      <div className="py-4 px-4 rounded shadow">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 text-center">
        ✨ {formattedCategory} Trivia ✨
        </h1>
      </div>
    </div>



      {/* Display Score to user after finishing*/}
      {isGameOver && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50 text-center p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</h2>
          <p className="text-xl text-purple-700 mb-6">
            You completed this Category. You got <strong>{score}</strong> points!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Back to Homepage
          </button>
        </div>
      )}

      {/* Jeopardy Design */}
      {Object.keys(questions).length === 0 ? (
        <p className="text-red-500 text-center mt-4">Just a moment...</p>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${subcategories.length + 1}, minmax(0, 1fr))`,
            }}
          >
            <div />
            {subcategories.map((sub) => (
              <div
                key={`header-${sub}`}
                className="text-center font-bold text-purple-800 text-sm md:text-base"
              >
                {sub}
              </div>
            ))}

            {difficultyLevels.map((level) => (
              <div key={`row-${level}`} className="contents">
                <div className="text-center font-bold text-yellow-600">{level}</div>

                {subcategories.map((sub) => {
                  const key = `${sub}-${level}`;
                  const data =
                    questions[sub]?.[level.toString()] || {
                      question: "No question",
                      answer: "No answer",
                    };

                  const revealState = revealed[key];

                  return (
                    <div
                      key={key}
                      className={`relative w-40 h-28 text-white flex items-center justify-center rounded-lg text-center p-2 transition duration-200 ${
                        revealState === "scored"
                          ? "bg-gray-500 cursor-default pointer-events-none opacity-60"
                          : "bg-blue-600 cursor-pointer hover:bg-blue-700"
                      }`}
                      onClick={() => handleClick(sub, level)}
                    >
                      {revealState === "question" ? (
                        <span className="text-yellow-300 text-xs">{data.question}</span>
                      ) : revealState === "answer" ? (
                        <div className="flex flex-col items-center w-full">
                          <span className="text-green-300 text-sm text-center px-1 mb-2">
                            {data.answer}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => handleScore(e, sub, level, true)}
                              className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                              ✅ Right
                            </button>
                            <button
                              onClick={(e) => handleScore(e, sub, level, false)}
                              className="px-2 py-1 text-xs bg-red-400 hover:bg-red-600 text-white rounded"
                            >
                              ❌ Wrong
                            </button>
                          </div>
                        </div>
                      ) : revealState === "scored" ? (
                        <span className="text-green-400 text-xs">Answered</span>
                      ) : (
                        <span className="text-lg font-bold">{level}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
