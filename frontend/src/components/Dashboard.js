import React from 'react';
import './Dashboard.css'; 

function Dashboard({ habits }) {
  const totalHabits = habits.length;

  const totalCheckins = habits.reduce((sum, habit) => {
    return sum + (habit.checkins?.length || 0);
  }, 0);

  const topHabit = habits.reduce((top, current) => {
    const streak = current.checkins?.length || 0;
    return streak > (top.checkins?.length || 0) ? current : top;
  }, {});

  return (
    <div className="dashboard-container">
      <h2>📋 Your Habit Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Habits</h3>
          <p>{totalHabits}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Check-ins</h3>
          <p>{totalCheckins}</p>
        </div>
        {topHabit.name && (
          <div className="dashboard-card highlight">
            <h3>🏆 Top Habit</h3>
            <p>{topHabit.name}</p>
            <small>{topHabit.checkins?.length} check-ins</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
