import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp, state }) {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('timer expired') });


    useEffect(() => {
        if (state) {
            resume()
        } else {
            pause()
        }
    }, [state])

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>
                <Typography fontSize={50}>{minutes}:{seconds}</Typography>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart</button> */}
        </div>
    );
}