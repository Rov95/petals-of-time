import React, { useEffect }  from 'react';
import fireworksIcon from '../assets/fireworks.png'; 
import bobaIcon from '../assets/boba.png'; 
import successSound from '../assets/success-sound.wav';
import sodaSound from '../assets/soda-sound.wav';


function StatusIndicator({ isWorkSession, pauseTran, tranTime, tranIsPaused }) {
  useEffect(() => {
    const audio = new Audio(isWorkSession ? successSound : sodaSound);
    audio.play();
  }, [isWorkSession]);

  return (
    <div className='Status'>
      {isWorkSession ? (
        <div className='great-work'>
          <h1>🎉 Great Work!</h1>
          <img
            src={fireworksIcon}
            alt="Fireworks Icon"
            className="fireworks-icon"
          />
          {/* <button onClick={() => pauseTran()}>{tranIsPaused ? 'Resume' : 'Pause'}</button> */}
          <p>Take a break in {tranTime} seconds...</p>
        </div>
      ) : (
        <div className='break-is-over'>
          <h1>Break is Over!</h1>
          <img
            src={bobaIcon}
            alt="Boba Icon"
            className="boba-icon"
          />
          {/* <button onClick={() => pauseTran()}>{tranIsPaused ? 'Resume' : 'Pause'}</button> */}
          <p>Resume focus in {tranTime} seconds...</p>
        </div>
      )}
    </div>
  );
}

export default StatusIndicator;
