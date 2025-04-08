export default function Categories() {
  const categories = [
    "General Knowledge",
    "Science",
    "History",
    "Geography",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 text-center p-8 space-y-10">
      
      {/* Instructions on how to play*/}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">How to Play JeoparTrivia:</h1>
        <p className="text-md text-purple-700">
            1. Select a trivia category to get started. <br />
            2. Each category has 4 subcategories and 5 difficulty levels: 100 to 500 points. <br />
            3. Click a card to reveal a question. <br />
            4. Click the card again to see the answer. <br />
            5. Choose whether you got it right (✅) or wrong (❌) to update your score. <br />
            6. Complete all the card questions to see your final score!
        </p>
      </div>

      {/* Category Selection Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-purple-600">Select a Category</h2>
        <p className="text-lg mt-2 text-purple-700">Choose a category to start your trivia challenge!</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-pink-600 text-white py-4 px-8 rounded-lg text-xl text-center hover:bg-yellow-500 transition"
            >
              <a href={`/quiz/${category.replace(/\s+/g, "-").toLowerCase()}`}>
                {category}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
