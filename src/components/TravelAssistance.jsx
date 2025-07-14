import { useState } from 'react';

const TravelAssistance = ({ formData, onAssistanceChange }) => {
  const [needsAssistance, setNeedsAssistance] = useState(
    formData.needsTravelAssistance !== undefined ? formData.needsTravelAssistance : false
  );
  const [selectedAssistance, setSelectedAssistance] = useState(
    formData.travelAssistance || 'Car'
  );

  const assistanceOptions = [
    { value: 'Car', label: 'Car' },
    { value: 'Flight', label: 'Flight' },
    { value: 'Bus', label: 'Bus' },
    { value: 'Train', label: 'Train' }
  ];

  const handleCheckboxChange = (checked) => {
    setNeedsAssistance(checked);
    onAssistanceChange({
      needsTravelAssistance: checked,
      travelAssistance: checked ? selectedAssistance : null
    });
  };

  const handleDropdownChange = (value) => {
    setSelectedAssistance(value);
    onAssistanceChange({
      needsTravelAssistance: needsAssistance,
      travelAssistance: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select your Travel Assistance
        </label>
        
        <div className="space-y-4">
          {/* Travel Assistance Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="travelAssistance"
              checked={needsAssistance}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="travelAssistance" className="text-sm font-medium text-gray-700">
              Travel Assistance
            </label>
          </div>

          {/* Dropdown - only show when checkbox is checked */}
          {needsAssistance && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Travel Assistance
              </label>
              <select
                value={selectedAssistance}
                onChange={(e) => handleDropdownChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {assistanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelAssistance;