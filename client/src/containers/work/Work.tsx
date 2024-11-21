import React, { useEffect, useState } from 'react';
import clickSound from '../../assets/click-sound.wav';
import './Work.css'

interface WorkProps {
  timeLeft: number;  // Time remaining in seconds
  isCounting: boolean;  // Whether the timer is counting
  toggleTimer: () => void;  // Function to toggle the timer's state
  restartTimer: () => void;  // Function to restart the timer
  isWorkSession: boolean;  // Whether it's a work or break session
  workPeriod: number;  // Duration of the work period in seconds
  breakPeriod: number;  // Duration of the break period in seconds

}


const Work: React.FC<WorkProps> = ({
  timeLeft,
  isCounting,
  toggleTimer,
  workPeriod,
}) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleClick = () => {
    playSound();
    toggleTimer();
  };

  const [animationSpeed, setAnimationSpeed] = useState<number>(workPeriod);

  useEffect(() => {
    if (isCounting) {
      const speed = Math.max(1, timeLeft / 10); // Dynamically adjust animation duration
      setAnimationSpeed(speed);
    }
  }, [timeLeft, isCounting]);

  return (
    <div className="work-timer">
      <h1>{formatTime(timeLeft)}</h1>
      <button className="work-toggle-button" onClick={handleClick}>
        {isCounting ? 'Pause' : 'Start'}
      </button>

      <div className="egg-to-chick-container">
        <div
          className={`egg ${isCounting ? 'animate' : ''}`}
          style={{ animationDuration: `${animationSpeed}s` }}
        />
        <div className="chick" />
      </div>
    </div>
  );
};

export default Work;
