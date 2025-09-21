import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Access = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-blue-200 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-4 text-red-500 text-4xl">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-2">
          You do not have permission to access this page.
        </p>
        <p className="text-gray-600 mb-6">
          Please log in with an account that has the appropriate permissions.
        </p>
        <a
          href="/login"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Access;
