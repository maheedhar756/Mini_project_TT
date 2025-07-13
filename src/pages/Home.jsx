import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] overflow-y-hidden">
      <Navbar />
      
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content - Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2f436e] leading-tight">
                Travel. Relax.
                <br />
                Memories.
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                With travel trip you can experience new travel and the best tourist destinations.
              </p>
              
              {/* Book a New Trip Button */}
              <Link to="/book-trip">
                <button className="bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg">
                  Book a New Trip
                </button>
              </Link>
            </div>
            
            {/* Right Image - Traveler with Backpack */}
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1752384319/t_dkmnvp.png"
                alt="Happy traveler with backpack"
                className="w-full max-w-lg h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Matches Figma Mobile Design */}
      <div className="md:hidden px-4 py-8 pb-24">
        <div className="bg-white rounded-2xl shadow-lg p-6 mx-auto max-w-sm">
          {/* Mobile Image - Centered at top */}
          <div className="flex justify-center mb-8">
            <img
              src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1752384319/t_dkmnvp.png"
              alt="Happy traveler with backpack"
              className="w-64 h-64 object-cover rounded-2xl"
            />
          </div>
          
          {/* Mobile Content - Centered below image */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-[#2f436e] leading-tight">
              Travel. Relax. Memories.
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              With travel trip you can experience new travel and the best tourist destinations.
            </p>
            
            {/* Full-width button for mobile */}
            <Link to="/book-trip">
              <button className="w-full bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg">
                Book a New Trip
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;