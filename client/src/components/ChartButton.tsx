import React from 'react';
import { FaRegChartBar } from "react-icons/fa";

// Define the props interface
interface ChartButtonProps {
  toggleChart: () => void;  // Function to toggle the chart
}

const ChartButton: React.FC<ChartButtonProps> = ({ toggleChart }) => {
  return (
    
      <button className="chart-button" onClick={toggleChart}>
        <FaRegChartBar style={{ color: 'white', fontSize: '24px' }} />
      </button>
    
  );
};

export default ChartButton;
