import React, { useState } from 'react';
import API from '../api';

function HabitForm({ onHabitCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    category: '',
    start_date: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    console.log('🛠 Submitting habit:', formData);

    try {
      const response = await API.post('habits/', formData);
      console.log(' Created habit:', response.data);

      alert(' Habit Created');
      setFormData({
        name: '',
        frequency: 'daily',
        category: '',
        start_date: ''
      });
      onHabitCreated(); 
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
        console.error(' API Error:', err.response.data);
      } else {
        setError({ detail: err.message });
        console.error(' Unknown Error:', err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        name="name"
        placeholder="Habit Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="frequency" value={formData.frequency} onChange={handleChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="health">Health</option>
        <option value="work">Work</option>
        <option value="learning">Learning</option>
      </select>

      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Habit</button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          {Object.entries(error).map(([field, messages], index) => (
            <div key={index}>
              <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default HabitForm;
