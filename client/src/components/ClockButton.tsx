import React from 'react';
import { FaRegClock } from "react-icons/fa";

// Define the props interface
interface ClockButtonProps {
  toggleClock: () => void;  // Function to set the work session to true
    disabled: boolean;  // Whether the button is disabled
    
}

const ClockButton: React.FC<ClockButtonProps> = ({ toggleClock, disabled }) => {
  return (
    <button
      className="clock-button"
      onClick={toggleClock}
          disabled={disabled}  // Disable the button if necessary
          
    >
      <FaRegClock style={{ color: 'white', fontSize: '24px' }} />
    </button>
  );
};

export default ClockButton;
