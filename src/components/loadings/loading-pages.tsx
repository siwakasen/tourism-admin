const LoadingPages = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingPages;
