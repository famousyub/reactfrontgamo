import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SettingsForm = ({ onAddFriend }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    textarea: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.dob.trim() && formData.textarea.trim() && formData.number.trim()) {
      const newFriend = {
        id: uuidv4(),
        ...formData,
      };
      onAddFriend(newFriend);
      setFormData({
        name: '',
        dob: '',
        textarea: '',
        number: '',
      });
    }
  };

  return (
<form onSubmit={handleSubmit} className="form-inline">
<div className="form-group mx-sm-3 mb-2">
    <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={formData.name} 
        onChange={handleChange}  
        className="form-control"
    />
</div>
<div className="form-group mx-sm-3 mb-2">
    <input 
        type="date" 
        name="dob" 
        value={formData.dob} 
        onChange={handleChange}   
        className="form-control" 
    />
</div>
<div className="form-group mx-sm-3 mb-2">
    <textarea 
        name="textarea" 
        placeholder="Description" 
        value={formData.textarea} 
        onChange={handleChange}  
        className="form-control"
    ></textarea>
</div>
<div className="form-group mx-sm-3 mb-2">
    <input 
        type="number" 
        name="number" 
        placeholder="Number" 
        value={formData.number} 
        onChange={handleChange}  
        className="form-control"
    />
</div>
<button type="submit" className="btn btn-primary mb-2">Add settings</button>
</form>
  );
};

export default SettingsForm;