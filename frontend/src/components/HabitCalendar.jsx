import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css'; 

function HabitCalendar({ checkins }) {
  const checkinDates = checkins.map(c =>
    new Date(typeof c === 'string' ? c : c.date).toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      if (checkinDates.includes(dateStr)) {
        return 'checkin-day';
      }
      if (dateStr === new Date().toDateString()) {
        return 'today-day';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

export default HabitCalendar;

