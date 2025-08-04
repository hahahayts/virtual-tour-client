export const Error = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md animate-fade-in">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error loading data
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn't load the accommodation information. Please try again
          later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all hover:scale-105"
        >
          Retry
        </button>
      </div>
    </div>
  );
};
