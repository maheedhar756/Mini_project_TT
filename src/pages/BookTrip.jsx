import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { TailSpin } from "react-loader-spinner";
import Navbar from "../components/Navbar";

const BookTrip = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    guests: "1",
    services: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // NEW: loading state
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Your Details" },
    { number: 2, title: "Date Selection" },
    { number: 3, title: "Guests" },
    { number: 4, title: "Travel Assistance" },
    { number: 5, title: "Confirmation" }
  ];

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get minimum end date (start date or today, whichever is later)
  const getMinEndDate = () => {
    const today = getTodayDate();
    return formData.startDate && formData.startDate >= today ? formData.startDate : today;
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Enter your name";
      }
      if (!formData.startLocation.trim()) {
        newErrors.startLocation = "Enter start location";
      }
      if (!formData.endLocation.trim()) {
        newErrors.endLocation = "Enter end location";
      }
    }
    
    if (currentStep === 2) {
      if (!formData.startDate) {
        newErrors.startDate = "Select start date";
      }
      if (!formData.endDate) {
        newErrors.endDate = "Select end date";
      }
      if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // If start date changes, clear end date if it's now invalid
    if (field === 'startDate' && formData.endDate && value > formData.endDate) {
      setFormData(prev => ({
        ...prev,
        endDate: ""
      }));
    }
  };

  const handleServiceChange = (service, checked) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
      } else {
        setLoading(true); // NEW: show loading spinner
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 1500); // Simulate booking delay
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 6) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Location
              </label>
              <input
                type="text"
                value={formData.startLocation}
                onChange={(e) => handleInputChange("startLocation", e.target.value)}
                placeholder="Enter start location"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startLocation ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.startLocation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Location
              </label>
              <input
                type="text"
                value={formData.endLocation}
                onChange={(e) => handleInputChange("endLocation", e.target.value)}
                placeholder="Enter end location"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endLocation ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.endLocation}</p>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                min={getTodayDate()}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                min={getMinEndDate()}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <select 
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Additional Services
              </label>
              <div className="space-y-3">
               ={[

                  { id: 'insurance', label: 'Travel Insurance' },
                  { id: 'guide', label: 'Local Guide' }
                ].map((service) => (
                  <label key={service.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={formData.services.includes(service.id)}
                      onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                    />
                    <span className="text-gray-700">{service.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-white mb-2">Confirmation</h3>
            <p className="text-gray-300 mb-6">Confirm your details</p>
            <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-600">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Start Location:</span>
                <span className="text-gray-600">{formData.startLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">End Location:</span>
                <span className="text-gray-600">{formData.endLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Start Date:</span>
                <span className="text-gray-600">{formData.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">End Date:</span>
                <span className="text-gray-600">{formData.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Guests:</span>
                <span className="text-gray-600">{formData.guests}</span>
              </div>
              {formData.services.length > 0 && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Travel Assistance:</span>
                  <span className="text-gray-600">{formData.services.join(', ')}</span>
                </div>
              )}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Awesome!</h3>
            <p className="text-gray-300 mb-6">Your booking has been confirmed.</p>
            <button
              onClick={() => navigate("/")}

              className="bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Book a New Trip
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Desktop Layout - Centered */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center min-h-[calc(120vh-80px)] px-6 py-8">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Sidebar - Steps */}
              <div className="col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <div
                        key={step.number}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          currentStep === step.number
                            ? "bg-blue-50"
                            : currentStep > step.number
                            ? "bg-green-50"
                            : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentStep === step.number
                              ? "bg-[#2f436e] text-white"
                              : currentStep > step.number
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {currentStep > step.number ? (
                            <Check size={16} />
                          ) : (
                            step.number
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{step.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content - Form */}
              <div className="col-span-9">
                <div className="bg-[#2f436e] rounded-lg shadow-lg p-8">
                  <div className="bg-white rounded-lg p-6">
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {steps[currentStep - 1].title}
                      </h3>
                      <p className="text-gray-600">
                        {currentStep === 1 && "Enter your name and location details"}
                        {currentStep === 2 && "Choose your travel dates"}
                        {currentStep === 3 && "Select number of guests"}
                        {currentStep === 4 && "Additional travel services"}
                        {currentStep === 5 && "Review and confirm your trip"}
                      </p>
                    </div>

                    {renderStepContent()}

                    <div className="mt-6 flex justify-between items-center">
                      {currentStep > 1 && currentStep < 6 && (
                        <button
                          onClick={handleBack}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={Object.keys(errors).length > 0 || loading}
                        className={`bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-2 px-8 rounded-lg transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <TailSpin
                              visible={true}
                              height={24}
                              width={24}
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                            <span className="ml-2">Booking...</span>
                          </span>
                        ) : currentStep === 5 ? "Book Trip" : "Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-4 pb-24">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">Step {currentStep} of 5</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#2f436e] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentStep === 1 && "Enter your name and location details"}
              {currentStep === 2 && "Choose your travel dates"}
              {currentStep === 3 && "Select number of guests"}
              {currentStep === 4 && "Additional travel services"}
              {currentStep === 5 && "Review and confirm your trip"}
            </p>
          </div>

          {renderStepContent()}

          <div className="mt-6 flex justify-between items-center">
            {currentStep > 1 && currentStep < 6 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={Object.keys(errors).length > 0 || loading}
              className={`w-full bg-[#2f436e] hover:bg-[#1f3251] text-white font-medium py-3 rounded-lg transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <TailSpin
                    visible={true}
                    height={24}
                    width={24}
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <span className="ml-2">Booking...</span>
                </span>
              ) : currentStep === 5 ? "Book Trip" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTrip;