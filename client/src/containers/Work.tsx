import React from 'react';
import clickSound from '../assets/click-sound.wav';

interface WorkProps {
  timeLeft: number;  // Time remaining in seconds
  isCounting: boolean;  // Whether the timer is counting
  toggleTimer: () => void;  // Function to toggle the timer's state
  restartTimer: () => void;  // Function to restart the timer
  isWorkSession: boolean;  // Whether it's a work or break session
  workPeriod: number;  // Duration of the work period in seconds
  breakPeriod: number;  // Duration of the break period in seconds
  lotusCount: number;  // Number of completed sessions (lotus count)
  completedSessions: number;  // Number of completed sessions
}

const Work: React.FC<WorkProps> = ({
  timeLeft,
  isCounting,
  toggleTimer,
  restartTimer,
  isWorkSession,
  workPeriod,
  breakPeriod,
  lotusCount,
  completedSessions,
}) => {
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
    <div className="work-timer">
      <h1>{formatTime(timeLeft)}</h1>
      <button className="work-toggle-button" onClick={handleClick}>
        {isCounting ? 'Pause' : 'Start'}
      </button>
      {/* The commented-out Restart button is left in case you'd like to enable it */}
      {/* <button className="work-restart-button" onClick={() => { toggleTimer(); restartTimer(); }}>
        Restart
      </button> */}
      {
        /*
          <div className="session-info">
            <p>{isWorkSession ? 'Work session' : 'Break session'}</p>
            
          
            <p>{isWorkSession ? `Work Time: ${formatTime(workPeriod)}` : `Break Time: ${formatTime(breakPeriod)}`}</p>
          </div>
        */
      }
      
    </div>
  );
}

export default Work;
