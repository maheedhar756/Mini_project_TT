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
      {/* Top Navbar for Desktop */}
      <nav className="hidden md:block fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#304766] w-full">
          <div className="flex justify-between items-center h-16 w-full">
            <h1 className="text-2xl font-bold text-white font-[caveat]">
              Travel Trip
            </h1>
            <div className="space-x-6 text-base font-medium">
              <Link to="/" className={navItemClass("/")}>Home</Link>
              <Link to="/my-trips" className={navItemClass("/my-trips")}>My Trips</Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline focus:outline-none bg-[#ffffff] px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white shadow-inner z-50">
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
