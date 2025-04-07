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

  //gets the subcategories for each category from the firestore database
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

  //gets the questions for each subcategory from the firestore database
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
    setRevealed((prev) => ({
      ...prev,
      [key]: prev[key] === "question" ? "answer" : "question",
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">{formattedCategory} Trivia</h1>
      {Object.keys(questions).length === 0 ? (
        <p className="text-red-500 mt-4">No questions available for this category yet.</p>
      ) : (
        <div className="w-full flex justify-center">
          <div
            className="grid gap-4 mt-6"
            style={{
              gridTemplateColumns: `repeat(${subcategories.length + 1}, minmax(0, 1fr))`,
            }}
          >
            <div />
            {subcategories.map((sub) => (
              <div key={`header-${sub}`} className="text-xl font-bold text-center text-purple-800">{sub}</div>
            ))}
            {difficultyLevels.map((level) => (
              <div key={`row-${level}`} className="contents">
                <div className="text-xl font-bold text-center text-yellow-600">{level}</div>
                {subcategories.map((sub) => {
                  const key = `${sub}-${level}`;
                  const data = questions[sub]?.[level.toString()] || { question: "No question", answer: "No answer" };
                  return (
                    <div
                      key={key}
                      className="relative w-32 h-32 bg-blue-600 text-white text-2xl font-bold flex items-center justify-center cursor-pointer rounded-lg hover:bg-blue-700 transition text-center p-2"
                      onClick={() => handleClick(sub, level)}
                    >
                      {revealed[key] === "question" ? (
                        <span className="text-sm text-yellow-300">{data.question}</span>
                      ) : revealed[key] === "answer" ? (
                        <span className="text-sm text-green-300">{data.answer}</span>
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
      )}
    </div>
  );
}
