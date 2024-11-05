import React, { useEffect, useState } from 'react';
import './Popup.css'; // Add your CSS for the modal
import FormWithDropdowns from './FormWithDropdowns';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: any; // Adjust type according to your form data structure
    onSubmit: (updatedData: any) => void; // Add this to handle submit action
}

interface FormData {
  id: number;
  name: string;
  mobile: string;
  city: string;
  state: string;
}

const Popup: React.FC<ModalProps> = ({ isOpen, formData, onSubmit, onClose }) => {
  const [formDataforPopup, setFormDataforPopup] = useState<FormData>(formData);

  useEffect(() => {
    if (isOpen) {
        setFormDataforPopup(formData); // Update local state when modal opens
        console.log("Opening modal with formData:", formData);
    }
}, [isOpen, formData]); // Log every time formData changes

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormDataforPopup((prevData) => ({
      ...prevData,
      [name]: value, // Update formData state locally
  }));
};

const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  onSubmit(formDataforPopup); // Submit the updated formData when the update button is clicked
  onClose(); // Close the popup/modal after submission
};

const handleSelectionChange = (state: string, city: string) => {
    setFormDataforPopup((prevData) => ({
        ...prevData,
        state,
        city,
    }));
};
    if (!isOpen || !formData) return null; // Only render if modal is open and formData is available

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Form</h2>
                <div className="modal-form">
                    <input
                        type="text"
                        name="name"
                        value={formDataforPopup.name || ''} // Display name from formData
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="mobile"
                        value={formDataforPopup.mobile || ''} // Display mobile from formData
                        onChange={handleChange}
                        placeholder="Mobile"
                    />
                    <div className='edit-select-box'>
                    <FormWithDropdowns 
                                    city={formDataforPopup.city} // Pass the current city
                                    state={formDataforPopup.state} // Pass the current state
                                    onSelectionChange={handleSelectionChange}
                                />
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
