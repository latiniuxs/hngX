export const BadRequest = ({ message }) => {
  return (
    <div
      className="error-container bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

