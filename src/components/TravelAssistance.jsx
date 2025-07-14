import { useState } from 'react';

const TravelAssistance = ({ formData, onAssistanceChange }) => {
  const [selectedAssistance, setSelectedAssistance] = useState(
    formData.travelAssistance || 'Car'
  );

  const assistanceOptions = [
    { value: 'Car', label: 'Car' },
    { value: 'Flight', label: 'Flight' },
    { value: 'Bus', label: 'Bus' },
    { value: 'Train', label: 'Train' }
  ];

  const handleChange = (value) => {
    setSelectedAssistance(value);
    onAssistanceChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select your Travel Assistance
        </label>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Travel Assistance
            </label>
            <select
              value={selectedAssistance}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {assistanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAssistance;