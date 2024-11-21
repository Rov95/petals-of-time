import React from "react";
import { RiListSettingsLine } from "react-icons/ri";

// Define the props interface
interface SettingsButtonProps {
  toggleSettings: () => void; // Function to toggle the settings view
  disabled: boolean; // New prop to control the disabled state

}

const SettingsButton: React.FC<SettingsButtonProps> = ({ toggleSettings, disabled }) => {
  return (
    <button
      className="settings-button"
      onClick={toggleSettings}
      disabled={disabled} // Disable the button if the prop is true
    >
      <RiListSettingsLine style={{ color: 'white', fontSize: '24px' }} />
    </button>
  );
};

export default SettingsButton;
