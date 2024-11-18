import React from 'react';
import tomatoIcon from '../assets/tomato.png';  // Import CSS styles for the dropping animation

// Define the props interface to specify that 'left' is a string (CSS value)
interface TomatoIconProps {
  left: string; // The left position for the tomato icon in CSS (e.g., '20%' or '50px')
}

const TomatoIcon: React.FC<TomatoIconProps> = ({ left }) => {
  return (
    <div className="tomato-icon" style={{ left }}>
      <img
        src={tomatoIcon}
        alt="Tomato Icon"
        className="tomatos-icon"
      />
    </div>
  );
};

export default TomatoIcon;
