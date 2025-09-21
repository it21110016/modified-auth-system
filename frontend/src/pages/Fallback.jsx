import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Fallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 px-6 text-center">
      <div className="flex flex-col items-center mb-6">
        <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-yellow-500 mb-4" />
        <h1 className="text-5xl font-extrabold text-gray-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Fallback;
