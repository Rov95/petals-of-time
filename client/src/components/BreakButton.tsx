import React from 'react';
import { FaBed } from "react-icons/fa";

// Define the props interface
interface BreakButtonProps {
  toggleBreak: () => void;  // Function to set the work session to true
    disabled: boolean;  // Whether the button is disabled
    
}

const BreakButton: React.FC<BreakButtonProps> = ({ toggleBreak, disabled }) => {
  return (
    <button
      className="break-button"
      onClick={toggleBreak}
          disabled={disabled}  // Disable the button if necessary
          
    >
      <FaBed style={{ color: 'white', fontSize: '24px' }} />
    </button>
  );
};

export default BreakButton;
