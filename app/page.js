export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="flex-1 text-center p-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to JeoparTrivia!</h1>
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

      {/* Image */}
      <div className="flex-1 p-8">
        <img
          src="/images/jeopardy-board.png" 
          alt="Jeopardy Board"
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
