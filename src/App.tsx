import './App.css';
import Form from './Components/Form';
import { useState, useEffect } from 'react';
import Table from './Components/Table';
import Popup from './Components/Popup';
import axios from 'axios';

interface FormData {
  id: number;
  name: string;
  mobile: string;
  city: string;
  state: string;
}

function App() {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<FormData | null>(null); // Store the data for the editing form

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get('https://registration-form-backend-9qb3.onrender.com/api/auth/get-form-data');
        console.log("response", response);
        setFormDataList(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handleFormSubmit = (data: FormData) => {
    setFormDataList((prevList) => [...prevList, data]);
  };

  // Function to handle updating an existing entry
  const handleEditSubmit = async (updatedData: FormData) => {
    if (editData) {
      try {
        console.log("submit edit id", editData.id,updatedData);
        // Send a PUT request to update the data in the database
        const response = await axios.put(`https://registration-form-backend-9qb3.onrender.com/api/auth/edit/${editData.id}`, updatedData);

        // Update the local list only if the API call was successful
        if (response.status === 200) {
          const updatedList = formDataList.map((item) =>
            item.id === editData.id ? response.data.data : item
          );
          console.log("updated list", updatedList);
          setFormDataList(updatedList);
          setEditData(null); // Reset the edit data after updating
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
    setModalOpen(false); // Close the modal
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("id", id);
      const response = await axios.delete(`https://registration-form-backend-9qb3.onrender.com/api/auth/delete/${id}`);
      if (response.status === 200) {
        console.log('User deleted successfully');
        setFormDataList(formDataList.filter(data => data.id !== id)); // Remove deleted entry from local state
        console.log("after delete", formDataList);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id: number) => {
    console.log("formDataList edit id:", id);
    const dataToEdit = formDataList.find(item => item.id === id); // Find the object by id
    if (dataToEdit) {
      setEditData(dataToEdit); // Set the data for editing
      setModalOpen(true);
    } else {
      console.error("Invalid edit id:", id);
    }
  };

  return (
    <div className='app'>
      <Form onSubmit={handleFormSubmit} />
      <Table formDataList={formDataList} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && editData && (
        <Popup
          isOpen={isModalOpen}
          onSubmit={handleEditSubmit}
          formData={editData} // Pass the correct form data object directly
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
