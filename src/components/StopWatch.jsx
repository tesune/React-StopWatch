import React, {useState, useEffect, useRef} from 'react'

const StopWatch = () => {
    // State of stopwatch running or paused/stopped (paused by default)
    const [isRunning, setIsRunning] = useState(false);
    // Stores the total elapsed time in milliseconds since the stopwatch started
    const [elapsedTime, setElapsedTime] = useState(0);
    // Holds the ID of the timer interval (initially set to null)
    const intervalIdRef = useRef(null);
    // Stores the timestamp (in milliseconds) when the stopwatch 
    // was started or last resumed (initially set to 0).
    const startTimeRef = useRef(0);

    useEffect(() => {
        // If the stopwatch is running, start the timer interval
        if (isRunning) {
            // The callback function inside the interval is executed 
            // every 10 milliseconds (controlled by the second argument, 10).
            intervalIdRef.current = setInterval(() => {
                // Callback updates the elapsedTime state by calculating the difference between the current time 
                // (Date.now()) and the startTimeRef.current (the time when the stopwatch began or last resumed). 
                // This ensures smooth counting even if paused.
                setElapsedTime(Date.now() - startTimeRef.current);
            },10);
        }

        // When the StopWatch component unmounts (removed from the DOM) or isRunning changes to false, 
        // the existing interval with the ID stored in intervalIdRef.
        // current is cleared using clearInterval to prevent memory leaks
        return () => {
            clearInterval(intervalIdRef.current);
        }
        
        // The effect (creating and clearing the timer) 
        // should only run again if the value of isRunning changes
    }, [isRunning]);

    const start = () => {
        // Subtracting the current elapsedTime from the current time. 
        // This ensures smooth counting even if the stopwatch was paused before.
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    const stop = () => {
        setIsRunning(false);
    }
    const reset = () => {
        // Sets both elapsedTime to 0 (resetting the timer) 
        // and isRunning to false (stopping the timer)
        setElapsedTime(0);
        setIsRunning(false);
    }
    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        // Pad the two digits for each with leading zeroes
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        // Time Format: HH:MM:SS:MS
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
  )
}

export default StopWatch