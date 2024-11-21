import React from 'react';
import { FaRegChartBar } from "react-icons/fa";

// Define the props interface
interface ChartButtonProps {
  toggleChart: () => void;  // Function to toggle the chart
  disabled: boolean;  // Whether the button is disabled
  
}

const ChartButton: React.FC<ChartButtonProps> = ({ toggleChart, disabled }) => {
  return (
    <button
      className="chart-button"
      onClick={toggleChart}
      disabled={disabled}  // Disable the button if the chart is open
    >
      <FaRegChartBar style={{ color: 'white', fontSize: '24px' }} />
    </button>
  );
};

export default ChartButton;
