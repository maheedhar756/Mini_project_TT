import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Load trips from localStorage
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips);
  }, []);

  const handleCancelTrip = (tripId) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Desktop Layout */}
      <div className="hidden md:block pt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">My Trips</h1>
          
          {trips.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No upcoming trips.</h2>
              <p className="text-gray-600 mb-6">When you book a trip, you will see your trip details here.</p>
              <Link to="/book-a-new-trip">
                <button className="bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-2 px-6 rounded-lg transition-colors hover:cursor-pointer">
                  Book a New Trip
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{trip.destination}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Date:</span> {formatDate(trip.startDate)} to {formatDate(trip.endDate)}</p>
                        <p><span className="font-medium">From:</span> {trip.startLocation}</p>
                        <p><span className="font-medium">Guests:</span> {trip.guests}</p>
                        <p><span className="font-medium">Travel Assistance:</span> {trip.needsTravelAssistance ? trip.travelAssistance : 'No'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancelTrip(trip.id)}
                      className="text-blue-600 hover:text-white font-medium text-sm border border-blue-600 hover:border-blue-800 px-3 py-1 rounded transition-colors hover:bg-blue-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-4 pb-24">
        <h1 className="text-xl font-bold text-gray-800 mb-6">My Trips</h1>
        
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">No upcoming trips.</h2>
            <p className="text-gray-600 mb-4 text-sm">When you book a trip, you will see your trip details here.</p>
            <Link to="/book-a-new-trip">
              <button className="bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Book a New Trip
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{trip.destination}</h3>
                  <button
                    onClick={() => handleCancelTrip(trip.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-600 hover:border-blue-800 px-2 py-1 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Date:</span> {formatDate(trip.startDate)} to {formatDate(trip.endDate)}</p>
                  <p><span className="font-medium">From:</span> {trip.startLocation}</p>
                  <p><span className="font-medium">Guests:</span> {trip.guests}</p>
                  <p><span className="font-medium">Travel Assistance:</span> {trip.needsTravelAssistance ? trip.travelAssistance : 'No'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;