import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BsSuitcase } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const navItemClass = (path) => {
    const baseClasses = "hover:text-white transition duration-300";
    const activeClasses = "font-semibold border-b-2";

    return location.pathname === path
      ? `text-white ${baseClasses} ${activeClasses}`
      : `text-white ${baseClasses}`;
  };

  const mobileNavItemClass = (path) =>
    location.pathname === path
      ? "flex flex-col items-center text-blue-600 font-semibold"
      : "flex flex-col items-center text-gray-500";

  return (
    <>
      {/* Nav for Desktop */}
      <nav className="hidden md:block fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#304766] w-full relative h-16">
          <h1 className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-white font-[caveat]">
            <Link to="/">Travel Trip</Link>
          </h1>
          <div className="flex justify-center items-center h-full space-x-6 text-base font-medium">
            <Link to="/" className={navItemClass("/")}>Home</Link>
            <Link to="/my-trips" className={navItemClass("/my-trips")}>My Trips</Link>
          </div>
          <button
            onClick={handleLogout}
            className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none bg-[#ffffff] px-3 py-1 rounded text-[#304766] hover:pointer-events-auto transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white z-50">
        <div className="flex justify-around py-2">
          <Link to="/" className={mobileNavItemClass("/")}>
            <FiHome className="text-xl mb-1" />
            <span className="text-xs">Home</span>
          </Link>

          <Link to="/my-trips" className={mobileNavItemClass("/my-trips")}>
            <BsSuitcase className="text-xl mb-1" />
            <span className="text-xs">My Trips</span>
          </Link>

          <button onClick={handleLogout} className="flex flex-col items-center text-red-500">
            <FiLogOut className="text-xl mb-1" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
