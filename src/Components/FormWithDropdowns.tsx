import React, { useState } from 'react';
import './FormWithDropdowns.css'


  interface StateCityDropdownProps {
    city: string; // Current city
    state: string; // Current state
    onSelectionChange: (state: string, city: string) => void;
}

  const FormWithDropdowns: React.FC<StateCityDropdownProps> = ({ city, state, onSelectionChange }) => {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
  
    const stateCityMap:any= {
      "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
      "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
      "Delhi": ["New Delhi", "Dwarka", "Janakpuri"],
      "West Bengal": ["Kolkata", "Siliguri", "Asansol"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
      // Add more states and cities as needed
    };
  
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newState = e.target.value;
      setSelectedState(newState);
      setSelectedCity(''); // Reset city when state changes
      onSelectionChange(newState, ''); // Update the form with the new state
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCity = e.target.value;
      setSelectedCity(newCity);
      onSelectionChange(selectedState, newCity); // Update the form with the new city
  };

  // Effect to sync selectedState and selectedCity with props
  React.useEffect(() => {
      setSelectedState(state);
      setSelectedCity(city);
  }, [state, city]);

  return (
      <div style={{ height: "100%", width: "100%" }}>
          <div className='box-1'>
              <select className='select-box' value={selectedState} onChange={handleStateChange}>
                  <option value="">Select State</option>
                  {Object.keys(stateCityMap).map((state) => (
                      <option key={state} value={state}>
                          {state}
                      </option>
                  ))}
              </select>
          </div>

          <div className='box-1'>
              <select className='select-box' value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                  <option value="">Select City</option>
                  {selectedState && stateCityMap[selectedState].map((city:any) => (
                      <option key={city} value={city}>
                          {city}
                      </option>
                  ))}
              </select>
          </div>
      </div>
  );
};

export default FormWithDropdowns;