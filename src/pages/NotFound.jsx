function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img
        src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1752391728/not_foundimg_e80uro.png"
        alt="Page Not Found"
        className="w-56 h-44 sm:w-[347px] sm:h-[290px] object-contain mb-3"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 text-center">
        Page Not Found.
      </h2>
      <p className="text-gray-500 text-center text-sm sm:text-base">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  );
}

export default NotFound;