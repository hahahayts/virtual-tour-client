export const NoData = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="text-center">
        <div className="text-6xl mb-4">🏨</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Accommodation Not Found
        </h2>
        <p className="text-gray-600">
          The accommodation you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};
