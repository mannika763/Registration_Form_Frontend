
import "./Form.css";
import { useState,useEffect } from 'react';
import Select from 'react-select';
import FormWithDropdowns from "./FormWithDropdowns";
import axios from "axios";

const options = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
];

interface FormData {
    id:number,
    name: string;
    mobile: string;
    city: string;
    state: string;
  }

  interface FormProps {
    onSubmit: (data: FormData) => void; // Prop to handle form submission
  }

  const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        id: Math.floor(Math.random() * 10000),
        name: '',
        mobile: '',
        city: '',
        state: ''
      });

      
      
      const generateRandomId = () => {
        return Math.floor(Math.random() * 10000); // Random ID generation logic
    };
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const fetchUsers = async () => {
        try {
            const response = await axios.get('https://registration-form-backend-9qb3.onrender.com/api/auth/get-form-data');
            setFormData(response.data); // Update users state with fetched data
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent any default button behavior
        const newId = generateRandomId(); // Generate a new random ID
        const newFormData = { ...formData }; // Set the new ID in formData

        try {
            const response = await axios.post('https://registration-form-backend-9qb3.onrender.com/api/auth/submit-form', formData);
            
            if (response.status === 201) { // Check for a successful creation
                console.log('Form submitted successfully',newFormData);
                onSubmit(newFormData); // Call onSubmit only after successful submission
                await fetchUsers(); // Fetch updated user list
                // Reset the form data after successful submission
                setFormData({
                    id: Math.floor(Math.random() * 10000), 
                    name: '',
                    mobile: '',
                    city: '',
                    state: ''
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    alert('A user with this mobile number already exists. Please use a different number.');
                } else {
                    console.error('Error submitting form:', error);
                    alert('An unexpected error occurred. Please try again later.');
                }
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };
      const handleStateCityChange = (state: string, city: string) => {
        setFormData((prevData) => ({ ...prevData, state, city }));
      };

  return (
    <>
     <div className="container">
        <div className="inside-container">
      <div className="box">
        <input type="text" id="name" name="name"
         onChange={handleChange}
         placeholder="Enter your name" value={formData.name}/>
      </div>
      <div className="box">
      <input type="number"  id="mobile"
            name="mobile"
       onChange={handleChange}
       placeholder="Enter your mobile number" value={formData.mobile}/>
      </div>
      <div className="dropdown-box">
      
     <FormWithDropdowns 
      city={formData.city} // Pass the current city
      state={formData.state}
     onSelectionChange={handleStateCityChange}/>
   
      </div>
      
      <div className="box">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
</div>
    </>
 
  
  
  )
}

export default Form
