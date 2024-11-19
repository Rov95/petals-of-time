import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Define the type for the work data
interface WorkData {
  date: string;  // E.g., 'Mon', 'Tue', 'Wed'
  hours: number; // E.g., 5, 3.5, 8
}

// Define the props interface for the Chart component
interface ChartProps {
  workData: WorkData[]; // An array of work data objects
}

const Chart: React.FC<ChartProps> = ({ workData }) => {
  // Function to create a gradient for the bars
  const gradientFill = (context: any) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // White at the top
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)'); // Faded white at the bottom
    return gradient;
  };

  const data = {
    labels: workData.map((data) => data.date), // E.g., ['Mon', 'Tue', 'Wed']
    datasets: [
      {
        label: 'Work Time (hours)',
        data: workData.map((data) => data.hours),
        backgroundColor: gradientFill,
        borderWidth: 0,
        borderRadius: 10, // Rounds off the bar edges
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Focus Hours',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#fff',
        },
        ticks: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          borderDash: [5, 5],
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#fff',
        },
        ticks: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Hides the vertical grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // Ensures the position is typed correctly
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} hours worked`,
        },
        padding: 10,
      },
    },
  };

  return (
    <div className="chart">
      <Bar data={data} options={options as any} /> {/* Type assertion to ensure options are accepted */}
    </div>
  );
};

export default Chart;
