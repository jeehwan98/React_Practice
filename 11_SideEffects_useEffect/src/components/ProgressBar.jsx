import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
    const [ remaindingTime, setRemaindingTime ] = useState(timer);

    // currently an infinite loop, which is why we would need a useEffect()
    useEffect(() => {
      const interval = setInterval(() => {
        console.log('INTERVAL'); // we have to stop it
        setRemaindingTime(prevTime => prevTime - 10);
      }, 10); // defines a function that will be executed every couple of times
  
      return () => {
        clearInterval(interval);
      }
    }, []);

    return (
        <progress value={remaindingTime} max={timer}/>
    )
}