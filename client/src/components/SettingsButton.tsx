import React from "react";
import { RiListSettingsLine } from "react-icons/ri";

// Define the props interface
interface SettingsButtonProps {
  toggleSettings: () => void; // Function to toggle the settings view
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ toggleSettings }) => {
  return (
    <div>
      <button className="settings-button" onClick={toggleSettings}>
        <RiListSettingsLine style={{ color: 'white', fontSize: '24px' }} />
        {/* <img
          src={settingsIcon}
          alt="Settings Icon"
          className="settings-icon"
        /> */}
      </button>
    </div>
  );
}

export default SettingsButton;
