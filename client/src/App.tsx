import './App.css';
import Work from './containers/work/Work.tsx';
import Break from './containers/break/Break.tsx';
import StatusIndicator from './components/statusIndicator/StatusIndicator.tsx';
import Settings from './components/settings/Settings.tsx';
import SettingsButton from './components/settingsButton/SettingsButton.tsx';
import Chart from './components/chart/Chart.tsx';
import ClockButton from './components/clockButton/ClockButton.tsx';
import ChartButton from './components/chartButton/ChartButton.tsx';
import BreakButton from './components/breakButton/BreakButton.tsx'
import ReturnButton from './components/returnButton/ReturnButton.tsx';
import React, { useState, useEffect, useRef } from 'react';


// Define types for fetched settings and work hours data
interface SettingsType {
  workPeriod: number;
  breakPeriod: number;
  longRest: number;
  sessionCount: number;
}

interface WorkHoursData {
  date: string;
  hours: number;
}
//fuck tomatoes
interface TomatoIconType {
  id: number;
  left: string;
}

function App(): JSX.Element {
  const [workPeriod, setWorkPeriod] = useState<number>(1 * 60);
  const [breakPeriod, setBreakPeriod] = useState<number>(1 * 60);
  const [longRest, setLongRest] = useState<number>(5 * 60);
  const [sessionCount, setSessionCount] = useState<number>(4);
  const [timeLeft, setTimeLeft] = useState<number>(workPeriod);

  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [isWorkSession, setIsWorkSession] = useState<boolean>(false);
  const [lotusCount, setLotusCount] = useState<number>(0);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [isBreakSession, setIsBreakSession] = useState<boolean>(false); // Add break session

  const [isTransition, setIsTransition] = useState<boolean>(false);
  const [tranIsPaused, setTranIsPaused] = useState<boolean>(false);
  const [tranTime, setTranTime] = useState<number>(5);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);

  const [lastUpdateDate, setLastUpdateDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [workHoursData, setWorkHoursData] = useState<WorkHoursData[]>([]);


  const apiEndpoint = 'http://localhost:5001';

  const toggleBreak = (): void => {
    if (!isBreakSession) {
      setIsBreakSession(true);
      setIsWorkSession(false);
      setTimeLeft(breakPeriod);
    } else {
      setIsBreakSession(false);
      setIsWorkSession(true);
      setTimeLeft(workPeriod);
    }
  };
  // Fetch settings from the backend
  useEffect(() => {
    const fetchSettings = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiEndpoint}/settings`);
        const settings: SettingsType = (await response.json())[-1];

        if (settings) {
          setWorkPeriod(settings.workPeriod * 60);
          setBreakPeriod(settings.breakPeriod * 60);
          setLongRest(settings.longRest * 60);
          setSessionCount(settings.sessionCount);
          setTimeLeft(settings.workPeriod * 60);
        }
      } catch (e) {
        console.error('Error fetching settings:', e);
      }
    };
    fetchSettings();
  }, []);

  // Fetch work hours data from the backend
  useEffect(() => {
    const fetchWorkHours = async (): Promise<void> => {
      if (isChartOpen) {
        try {
          const response = await fetch(`${apiEndpoint}/work-hours`);
          const data = await response.json();
          setWorkHoursData(
            data.map((entry: { date: string; work_time: number }) => ({
              date: entry.date,
              hours: entry.work_time / 60,
            }))
          );
        } catch (e) {
          console.error('Error fetching work hours:', e);
        }
      }
    };
    fetchWorkHours();
  }, [isChartOpen, lotusCount]);

  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastUpdateDate !== today) {
      setLotusCount(0);
      setLastUpdateDate(today);
    }
  }, [lastUpdateDate]);

  // Handle settings changes
  const handleSettingsChange = async (newSettings: SettingsType): Promise<void> => {
    try {
      await fetch(`${apiEndpoint}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      const newWorkPeriod = newSettings.workPeriod * 60;
      const newBreakPeriod = newSettings.breakPeriod * 60;
      const newLongRest = newSettings.longRest * 60;

      setWorkPeriod(newWorkPeriod);
      setBreakPeriod(newBreakPeriod);
      setLongRest(newLongRest);
      setSessionCount(newSettings.sessionCount);
      setTimeLeft(isWorkSession ? newWorkPeriod : newBreakPeriod);
    } catch (e) {
      console.error('Error updating settings:', e);
    }
  };

  const recordWorkSession = async (workMinutes: number): Promise<void> => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await fetch(`${apiEndpoint}/work-hours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: today,
          work_time: workMinutes,
          completed_sessions: 1,
        }),
      });
    } catch (error) {
      console.error('Error recording work hours:', error);
    }
  };



  // Countdown logic for work/break
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
      setIsTransition(true);
      setTranTime(5);

      if (isWorkSession) {
        recordWorkSession(workPeriod / 60);
        setLotusCount((prevCount) => prevCount + 1);
    
        setCompletedSessions((prevSessions) => prevSessions + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [isCounting, timeLeft, isWorkSession]);

  // Transition countdown logic
  useEffect(() => {
    let tranTimer: NodeJS.Timeout;
    if (isTransition && tranTime > 0 && !tranIsPaused) {
      tranTimer = setTimeout(() => setTranTime((preTime) => preTime - 1), 1000);
    } else if (tranTime === 0 && isTransition) {
      setIsTransition(false);
      if (isWorkSession) {
        setTimeLeft(completedSessions < sessionCount ? breakPeriod : longRest);
        setIsWorkSession(false);
        setCompletedSessions((prev) => (prev < sessionCount ? prev : 0));
      } else {
        setIsWorkSession(true);
        setTimeLeft(workPeriod);
      }
    }
    return () => clearTimeout(tranTimer);
  }, [tranTime, isTransition, tranIsPaused, isWorkSession, workPeriod, breakPeriod, longRest, completedSessions, sessionCount]);

  const toggleTimer = (): void => setIsCounting(!isCounting);

  const pauseTran = (): void => setTranIsPaused((prevState) => !prevState);

  const restartTimer = (): void => {
    setIsWorkSession(true);
    setTimeLeft(workPeriod);
    setIsCounting(false);
    setTranIsPaused(false);
    setIsTransition(false);
  };

  const backToHome = (): void => {
    setIsSettingsOpen(false);
    setIsChartOpen(false);
  };

  return (
    <div className={`App ${isWorkSession ? 'work-session' : 'break-session'}`}>
      {(isSettingsOpen || isChartOpen || isWorkSession) && <ReturnButton backToHome={backToHome} />}
  
      {/* Settings Button */}
      <SettingsButton
        toggleSettings={() => {
          // When Settings button is clicked, open settings and close chart
          if (!isSettingsOpen) {
            setIsSettingsOpen(true);
            setIsWorkSession(false);
            setIsChartOpen(false);// Close work
            setIsBreakSession(false);
              // Open settings
            
            ;// Close chart
          }
        }}
        disabled={isSettingsOpen} // Disable button when settings page is open
      />
      
      {/* Chart Button */}
      <ChartButton
        toggleChart={() => {
          // When Chart button is clicked, open chart and close settings
          if (!isChartOpen) {
            setIsChartOpen(true);  // Open chart
            setIsSettingsOpen(false);
            setIsWorkSession(false); // Close settings
            setIsBreakSession(false);
          }
        }}
        disabled={isChartOpen} // Disable button when chart page is open
      />

      
      {/* Break Button */}
      <BreakButton 
        toggleBreak={() => {
          if (!isBreakSession) {
            setIsBreakSession(true);
            setIsSettingsOpen(false);
            setIsWorkSession(false);
            setIsChartOpen(false);
          }
        }}
        disabled={isBreakSession}
      />

          
           <ClockButton
        toggleClock={() => {
          console.log("Clock Button clicked!");
          console.log("Current states:", { isWorkSession, isSettingsOpen, isChartOpen });
          // When Settings button is clicked, open settings and close work
          if (!isWorkSession) {
            setIsWorkSession(true);  // Open settings
            setIsSettingsOpen(false);
            setIsChartOpen(false);// Close work
            setIsBreakSession(false);
            
          }
        }}
        disabled={isWorkSession} // Disable button when settings page is open
      />
      
      {/* Settings Section */}
      {isSettingsOpen ? (
        <Settings onSettingsChange={handleSettingsChange} closeSettings={() => setIsSettingsOpen(false)} />
      ) : isChartOpen ? (
        // Chart Section
        <Chart workData={workHoursData} />
      ) : null} {/* No default content needed */}
      
      {/* Main Content when neither Settings nor Chart is open */}
      {isSettingsOpen || isChartOpen ? null : (
        <div className="main">
          {isTransition ? (
            <StatusIndicator
              isWorkSession={isWorkSession}
              pauseTran={pauseTran}
              tranTime={tranTime}
              tranIsPaused={tranIsPaused}
            />
          ) : isWorkSession ? (
            <Work
              timeLeft={timeLeft}
              isCounting={isCounting}
              toggleTimer={toggleTimer}
              restartTimer={restartTimer}
              isWorkSession={isWorkSession}
              workPeriod={workPeriod}
              breakPeriod={breakPeriod}
          
          
            />
          ) : (
            <Break
              timeLeft={timeLeft}
              isCounting={isCounting}
              toggleTimer={toggleTimer}
                  restartTimer={restartTimer}
                  isBreakSession ={isBreakSession}
                  breakPeriod={breakPeriod}
            />
          )}
        </div>
      )}
      
      {/* Optional Lotus Count Section */}
      {/* <div className="lotus">
        <LotusCount lotusCount={lotusCount} />
      </div> */}
      
      {/* Icons Section */}
 
    
    </div>
  );
}
  // Add the export default here:
  export default App;
  
