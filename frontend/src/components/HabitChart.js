import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function HabitChart({ checkins }) {
  const parsed = checkins
    .map(c => (typeof c === 'string' ? c : c.date))
    .sort();

  const countByDate = parsed.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(countByDate);
  const dataValues = Object.values(countByDate);

  const data = {
    labels,
    datasets: [
      {
        label: 'Check-ins',
        data: dataValues,
        fill: false,
        backgroundColor: 'rgb(0, 123, 255)',
        borderColor: 'rgba(0, 123, 255, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Habit Progress Over Time' },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '500px', height: '300px', margin: '1rem auto' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default HabitChart;
