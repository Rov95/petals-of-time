import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import './ReturnButton.css'

// Define the props interface
interface ReturnButtonProps {
  backToHome: () => void;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ backToHome }) => {
  return (
    <div>
      <button className="button back-button" onClick={backToHome}>
        <IoMdArrowBack style={{ color: 'white', fontSize: '24px' }} />
      </button>
    </div>
  );
};

export default ReturnButton;
