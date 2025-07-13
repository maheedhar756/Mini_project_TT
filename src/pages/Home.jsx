import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapPin, CalendarDays } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <Navbar />
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-caveat text-[#2f436e]">Travel Trip</h1>
        <Link to="/my-trips">
          <button className="bg-[#2f436e] text-white px-4 py-2 rounded-xl text-sm shadow">
            My Trips
          </button>
        </Link>
      </header>

      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-[#2f436e] mb-4 font-inter">
          Plan your next trip ✈️
        </h2>

        <Link to="/newtrip">
          <button className="bg-[#304766] hover:bg-[#1f3251] text-white font-inter py-2 px-4 rounded-xl">
            Book a New Trip
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
