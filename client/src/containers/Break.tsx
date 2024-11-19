import React from 'react';
import clickSound from '../assets/click-sound.wav';

interface BreakProps {
  timeLeft: number;  // Time remaining in seconds
  isCounting: boolean;  // Whether the timer is counting
  toggleTimer: () => void;  // Function to toggle the timer's state
  restartTimer: () => void;  // Function to restart the timer
}

const Break: React.FC<BreakProps> = ({ timeLeft, isCounting, toggleTimer, restartTimer }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  }

  const handleClick = () => {
    playSound();
    toggleTimer();
  }

  return (
    <div className="break-timer">
      <h1>{formatTime(timeLeft)}</h1>
      <button className="break-toggle-button" onClick={handleClick}>
        {isCounting ? 'Pause' : 'Start'}
      </button>

{/*       <button className="work-restart-button" onClick={() => restartTimer()}>
        End Break
      </button> */}

    </div>
  );
}

export default Break;
