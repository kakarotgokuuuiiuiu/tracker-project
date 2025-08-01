import React, { useState } from 'react';
import API from '../api';

function CheckInForm({ habitId, onCheckinSuccess }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || isNaN(new Date(date))) {
      setMessage(' Invalid date.');
      return;
    }

    try {
      console.log("Submitting Check-in:", { habit: habitId, date, note });

      await API.post('checkins/', {
        habit: habitId,
        date,
        note,
      });

      setMessage(' Check-in added!');
      setDate(todayStr);  
      setNote('');

      if (onCheckinSuccess) {
        console.log(" Triggering habit refresh");
        onCheckinSuccess();
      }

    } catch (err) {
      console.error('❌ Check-in failed:', err);
      setMessage('❌ Check-in failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '0.5rem' }}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={note}
        placeholder="Optional note"
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Check In</button>
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
    </form>
  );
}

export default CheckInForm;
