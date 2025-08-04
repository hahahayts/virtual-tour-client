export const Fetching = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-40 bg-gray-300 rounded"></div>
            </div>
            <div className="h-40 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
