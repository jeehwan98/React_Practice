import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remaindingTime, setRemaindingTime] = useState(timeout);

    useEffect(() => {
        console.log('timeout')
        const timer = setTimeout(onTimeout, timeout); // in order to have 1 timer that is running

        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    // we aren't resetting the interval whenver the timeout changes
    useEffect(() => {
        console.log('interval');
        // this would be an infinite loop, which is why we need an useEffect
        // this interval is getting triggered twice, which is the reason why the progress bar is half
        const interval = setInterval(() => {
            setRemaindingTime(prevRemaindingTime => prevRemaindingTime - 100);
        }, 100);

        // need a clean up function in order to execute the interval once
        return () => {
            clearInterval(interval);
        };
    }, []); // since there are no props or state values, it is an empty dependency array
    
    

    return (
        <progress
            id="question-timer"
            max={timeout}
            value={remaindingTime}
            className={mode}
        />
    )
}