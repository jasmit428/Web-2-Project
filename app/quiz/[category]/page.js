"use client";
import { useState, useEffect } from "react";

// Sample design for science category 
//aiana will replace with database later
const sampleQuestions = {
  "Chemistry": [
    { "question": "What is the chemical symbol for water?", "answer": "H2O" },
    { "question": "What element does 'Na' represent on the periodic table?", "answer": "Sodium" },
    { "question": "What is the atomic number of Carbon?", "answer": "6" },
    { "question": "What is the pH value of pure water?", "answer": "7" },
    { "question": "What is the name of the acid found in gastric juices?", "answer": "Hydrochloric acid" }
  ],
  "Biology": [
    { "question": "What is the study of living organisms called?", "answer": "Biology" },
    { "question": "What organ is responsible for pumping blood through the body?", "answer": "Heart" },
    { "question": "What is the process by which plants make their food?", "answer": "Photosynthesis" },
    { "question": "What is the largest organ in the human body?", "answer": "Skin" },
    { "question": "What is the name of the molecule that carries genetic information?", "answer": "DNA" }
  ],
  "Physics": [
    { "question": "What is the unit of force?", "answer": "Newton" },
    { "question": "What is the speed of light in a vacuum?", "answer": "299,792,458 m/s" },
    { "question": "Who is known as the father of modern physics?", "answer": "Albert Einstein" },
    { "question": "What is the main force that keeps planets in orbit around the sun?", "answer": "Gravity" },
    { "question": "What is the law of inertia?", "answer": "An object at rest will stay at rest, and an object in motion will stay in motion unless acted upon by an outside force." }
  ],
  "Space": [
    { "question": "What is the closest planet to the Sun?", "answer": "Mercury" },
    { "question": "What is the name of the galaxy we live in?", "answer": "The Milky Way" },
    { "question": "What is the largest planet in our solar system?", "answer": "Jupiter" },
    { "question": "What is the name of the first manned spacecraft to land on the Moon?", "answer": "Apollo 11" },
    { "question": "What is the name of the planet known for its rings?", "answer": "Saturn" }
  ]
};

const difficultyLevels = [100, 200, 300, 400, 500];

export default function QuizCategory() {
  //sample science questions for now
  const selectedCategories = ["Chemistry", "Biology", "Physics", "Space"];
  
  const [revealed, setRevealed] = useState({});

  const handleClick = (cat, level) => {
    const key = `${cat}-${level}`;
    setRevealed((prev) => ({
      ...prev,
      [key]: prev[key] === "question" ? "answer" : "question", //click for question then answer
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-purple-600">Science Trivia</h1>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {/* Display Categories as Column Headers */}
        <div key="empty-header"></div> {/* Empty top-left corner */}
        {selectedCategories.map((cat, index) => (
          <div key={`category-${index}`} className="text-xl font-bold text-center text-purple-800">
            {cat}
          </div>
        ))}

        {/* Jeopardy Board */}
        {difficultyLevels.map((level) => (
          <div key={`row-${level}`} className="contents">
            {/* Difficulty Levels as Row Headers */}
            <div key={`level-${level}`} className="text-xl font-bold text-center text-yellow-600">
              {level}
            </div>

            {/* Question Cards */}
            {selectedCategories.map((cat, index) => {
              const key = `${cat}-${level}`;
              const questionData =
                sampleQuestions[cat]?.[Math.floor(level / 100) - 1] || { question: "No question", answer: "No answer" };

              return (
                <div
                  key={key}
                  className="relative w-32 h-32 bg-blue-600 text-white text-2xl font-bold flex items-center justify-center cursor-pointer rounded-lg hover:bg-blue-700 transition text-center"
                  onClick={() => handleClick(cat, level)}
                >
                  {revealed[key] === "question" ? (
                    <span className="text-lg text-yellow-300 px-2">{questionData.question}</span>
                  ) : revealed[key] === "answer" ? (
                    <span className="text-lg text-green-300 px-2">{questionData.answer}</span>
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




