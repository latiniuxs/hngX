import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-center text-gray-800">
         Error 404, Page Not Found
        </h1>
        <p className="mt-4 text-lg text-center text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold text-sm transition duration-300 ease-in-out"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

