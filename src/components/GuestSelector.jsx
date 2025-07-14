import { useState } from 'react';

const GuestSelector = ({ formData, onGuestChange }) => {
  const [guests, setGuests] = useState({
    adults: parseInt(formData.guests) || 1,
    children: 0,
    infants: 0
  });

  const updateGuests = (type, value) => {
    const newGuests = { ...guests, [type]: Math.max(0, value) };
    setGuests(newGuests);
    
    // Calculate total guests for form data
    const total = newGuests.adults + newGuests.children + newGuests.infants;
    onGuestChange(total.toString(), newGuests);
  };

  const GuestCounter = ({ label, sublabel, count, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium text-gray-800">{label}</div>
        <div className="text-sm text-gray-500">{sublabel}</div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(count - 1)}
          disabled={count === 0 || (label === 'Adults' && count === 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{count}</span>
        <button
          type="button"
          onClick={() => onChange(count + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select your Guests
        </label>
        <div className="border border-gray-300 rounded-lg p-4 space-y-2">
          <GuestCounter
            label="Adults"
            sublabel="Age 13 or above"
            count={guests.adults}
            onChange={(value) => updateGuests('adults', value)}
          />
          <hr className="border-gray-200" />
          <GuestCounter
            label="Children"
            sublabel="Age 2-12"
            count={guests.children}
            onChange={(value) => updateGuests('children', value)}
          />
          <hr className="border-gray-200" />
          <GuestCounter
            label="Infants"
            sublabel="Under 2"
            count={guests.infants}
            onChange={(value) => updateGuests('infants', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;