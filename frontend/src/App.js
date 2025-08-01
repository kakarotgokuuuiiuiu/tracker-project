import React, { useState, useEffect } from 'react';
import API from './api';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import './App.css';
import Dashboard from './components/Dashboard';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = () => {
    API.get('habits/').then(res => {
      const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setHabits(sorted);
    });
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="app-container">
    <h2 style={{ textAlign: 'center', fontSize: '1.75rem', color: '#333' }}>HABITS</h2>

      <Dashboard habits={habits} />
      <HabitForm onHabitCreated={fetchHabits} /> 
      <HabitList habits={habits} refreshHabits={fetchHabits} />
    </div>
  );
}

export default App;
