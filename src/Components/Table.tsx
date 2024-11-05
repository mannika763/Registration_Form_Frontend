import React from 'react';
import "./Table.css"

interface FormData {
    id:number,
  name: string;
  mobile: string;
  city: string;
  state: string;
}

interface TableProps {
  formDataList: FormData[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void; 
}

const Table: React.FC<TableProps> = ({ formDataList, onEdit, onDelete }) => {


    
  return (
    <div className="table-container">
      <h2>Form Data Table</h2>
      <table>
        <thead>
          <tr>
          <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((data, index) => (
            <tr key={index}>
                 <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.mobile}</td>
              <td>{data.city}</td>
              <td>{data.state}</td>
              <td>
                <button onClick={() => {console.log(index)
                    onEdit(data.id)}}>Edit</button>
                    <button onClick={() => onDelete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
