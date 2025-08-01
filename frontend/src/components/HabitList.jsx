import React, { useState } from 'react';
import CheckInForm from './CheckInForm';
import HabitChart from './HabitChart';
import HabitCalendar from './HabitCalendar';
import API from '../api';
import './HabitList.css';

function calculateStreak(checkins) {
  const sorted = [...checkins].sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let today = new Date();

  for (let date of sorted) {
    const checkInDate = new Date(date);
    if (
      checkInDate.toDateString() === today.toDateString() ||
      checkInDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()
    ) {
      streak++;
    } else {
      break;
    }
    today.setDate(today.getDate() - 1);
  }
  return streak;
}

function getBestDays(checkins) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const counts = {};

  checkins.forEach(dateStr => {
    const date = new Date(dateStr);
    const day = weekdays[date.getDay()];
    counts[day] = (counts[day] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));
  return Object.entries(counts)
    .filter(([_, count]) => count === maxCount)
    .map(([day]) => day);
}

function HabitList({ habits, refreshHabits }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (habit) => {
    setEditingId(habit.id);
    setEditData({
      name: habit.name,
      category: habit.category,
      frequency: habit.frequency,
      start_date: habit.start_date,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await API.put(`habits/${id}/`, editData);
      alert(' Habit updated');
      setEditingId(null);
      refreshHabits();
    } catch (err) {
      alert(' Failed to update habit');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await API.delete(`habits/${id}/`);
        alert(' Habit deleted');
        refreshHabits();
      } catch (err) {
        alert('77- Failed to delete habit');
        console.error(err);
      }
    }
  };

  const habitCardStyle = {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '1.75rem', color: '#333' }}>Your Habits</h2>

      {habits.length === 0 ? (
        <p>No habits yet.</p>
      ) : (
        [...habits]
          .sort((a, b) => b.id - a.id)
          .map((habit) => {
            const checkinsRaw = Array.isArray(habit.checkins) ? habit.checkins : [];
            const checkins = checkinsRaw.map(c => typeof c === 'string' ? c : c.date);
            const streak = calculateStreak(checkins);
            const bestDays = getBestDays(checkins);

            return (
              <div key={habit.id} style={habitCardStyle}>
                {editingId === habit.id ? (
                  <form onSubmit={(e) => handleUpdate(e, habit.id)}>
                    <input type="text" name="name" value={editData.name} onChange={handleEditChange} required />
                    <select name="category" value={editData.category} onChange={handleEditChange}>
                      <option value="health">Health</option>
                      <option value="work">Work</option>
                      <option value="learning">Learning</option>
                    </select>
                    <select name="frequency" value={editData.frequency} onChange={handleEditChange}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                    <input type="date" name="start_date" value={editData.start_date} onChange={handleEditChange} />
                    <button type="submit"> Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                  <h3 className="habit-name">{habit.name}</h3>
                  <div className="habit-details">
                  <p><span className="habit-label">Category:</span> {habit.category}</p>
                  <p><span className="habit-label">Frequency:</span> {habit.frequency}</p>
                  <p><span className="habit-label streak">Streak:</span> {streak} days</p>
                  <p><span className="habit-label success-rate">Success Rate:</span> {habit.success_rate}%</p>
                  </div>


                    <CheckInForm habitId={habit.id} onCheckinSuccess={refreshHabits} />
                    <HabitCalendar checkins={checkinsRaw} />
                    <HabitChart checkins={checkinsRaw} />

                    <p> Best Day(s): {bestDays.join(', ')}</p>

                    <div style={{ marginTop: '0.5rem' }}>
                      <button onClick={() => handleEdit(habit)}> Edit</button>
                      <button onClick={() => handleDelete(habit.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>
                         Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
      )}
    </div>
  );
}

export default HabitList;
