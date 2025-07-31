import { useNavigate } from "react-router";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Optional: Redirect after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect after 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-5">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to Homepage
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>

      <p className="mt-8 text-gray-500">
        You'll be automatically redirected to the homepage in 5 seconds...
      </p>
    </div>
  );
};

export default NotFoundPage;
