const LoadingPages = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-green-400">{message}</p>
    </div>
  );
};

export default LoadingPages;
