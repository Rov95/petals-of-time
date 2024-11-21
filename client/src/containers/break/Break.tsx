import React, { useEffect, useState } from 'react';
import clickSound from '../../assets/click-sound.wav';
import './Break.css'

interface BreakProps {
  timeLeft: number;  // Time remaining in seconds
  isCounting: boolean;  // Whether the timer is counting
  toggleTimer: () => void;  // Function to toggle the timer's state
  restartTimer: () => void;  // Function to restart the timer
  isBreakSession: boolean;  // Whether it's a break session
  breakPeriod: number;  // Duration of the break period in seconds
}

const Break: React.FC<BreakProps> = ({
  timeLeft,
  isCounting,
  toggleTimer,
  restartTimer,
  isBreakSession,
  breakPeriod
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

  const [animationSpeed, setAnimationSpeed] = useState<number>(breakPeriod);

  useEffect(() => {
    if (isCounting) {
      const speed = Math.max(1, timeLeft / 10); // Dynamically adjust animation duration
      setAnimationSpeed(speed);
    }
  }, [timeLeft, isCounting]);

  return (
    <div className="break-timer">
      <h1>{formatTime(timeLeft)}</h1>
      <button className="break-toggle-button" onClick={handleClick}>
        {isCounting ? 'Pause' : 'Start'}
      </button>

      {/* This could represent some kind of animation to indicate a break */}
      <div className="sleep-container">
        <div
          className={`sleep ${isCounting ? 'animate' : ''}`}
          style={{ animationDuration: `${animationSpeed}s` }}
        />
        <div className="sleep" />
      </div>
    </div>
  );
}

export default Break;
