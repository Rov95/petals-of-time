import React from "react";
import { useState, ChangeEvent } from "react";

// Define the props interface
interface SettingsProps {
  onSettingsChange: (settings: {
    workPeriod: number;
    breakPeriod: number;
    longRest: number;
    sessionCount: number;
  }) => void;
  closeSettings: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSettingsChange, closeSettings }) => {
  const [workPeriodInput, setWorkPeriodInput] = useState<number>(0.1);
  const [breakPeriodInput, setBreakPeriodInput] = useState<number>(1);
  const [longRestInput, setLongRestInput] = useState<number>(1);
  const [sessionCountInput, setSessionCountInput] = useState<number>(4);

  // Function to handle saving the settings
  const handleSave = () => {
    onSettingsChange({
      workPeriod: workPeriodInput,
      breakPeriod: breakPeriodInput,
      longRest: longRestInput,
      sessionCount: sessionCountInput,
    });
  
  };

  // Event handler to change input values for numeric fields
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(Number(e.target.value));
  };

  return (
    <div className="settings">
      <div>
        <label>Focus Period</label>
        <input
          type="number"
          value={workPeriodInput}
          onChange={handleInputChange(setWorkPeriodInput)}
        />
        <span>mins</span>
      </div>
      <div>
        <label>Short Break</label>
        <input
          type="number"
          value={breakPeriodInput}
          onChange={handleInputChange(setBreakPeriodInput)}
        />
        <span>mins</span>
      </div>
      <div>
        <label>Long Rest</label>
        <input
          type="number"
          value={longRestInput}
          onChange={handleInputChange(setLongRestInput)}
        />
        <span>mins</span>
      </div>
      <div>
        <label>Before Long Rest</label>
        <input
          type="number"
          value={sessionCountInput}
          onChange={handleInputChange(setSessionCountInput)}
        />
        <span>streaks</span>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
