export default function Categories() {
    const categories = [
      "General Knowledge",
      "Science",
      "History",
      "Geography",
      "Music",
      "Movies",
    ];
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 text-center p-8">
        <h1 className="text-4xl font-bold text-purple-600">Select a Category</h1>
        <p className="text-lg mt-4 max-w-2xl text-purple-700">Choose a category to start your trivia challenge!</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-pink-600 text-white py-4 px-8 rounded-lg text-xl text-center hover:bg-yellow-500 transition">
              <a href={`/quiz/${category.replace(/\s+/g, "-").toLowerCase()}`}>{category}</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  