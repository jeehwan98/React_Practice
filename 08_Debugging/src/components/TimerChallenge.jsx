import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

// the problem why we're unable to stop the timer is due to the fact that we're using a variable and not ref
// let timer; // it is a variable that is shared across all component instances that are based on this component function
// therefore after i press the timer for the 5 second and 1 second, the pointer for the setTimeout for the 5 second will be set by 1 second, resulting in an error

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(); // by using the useRef, we're giving the value for the pointer for the current time, not across the whole component function
                            // meaning that every component instance of the timer challenge component will get its own timer ref 
                            // that works totally independently from the other refs that belong to the other instances of that component

                            // reacts will store these timer values behind the scenes and make sure that they don't get lost as this component function re-executes
    const dialog = useRef();

    // const [ timerStarted, setTimerStarted ] = useState(false);
    // const [ timerExpired, setTimerExpired ] = useState(false);

    const [ timeRemaining, setTimeRemaining ] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    // want to stop the timer manually when the timer expires
    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10); // updating the remainding time
        }, 10);
    }

    // function handleStart() {
    //     timer.current = setTimeout(() => {
    //         setTimerExpired(true);
    //         dialog.current.showModal(); // is a built in dialogue element to show a modal -> refers to the userImperativeHandle method in the child component
    //     }, targetTime * 1000);

    //     setTimerStarted(true);          // we can write this code after because this line will execute immediately after setting the imer, not after it expired
    // }

    function handleStop() {
        // in order to get the setTimeOut in handleStart function, we can use the Ref to help us
        // clearTimeout(timer.current);    // needs a pointer as an input to stop a timer
        dialog.current.open();
        clearInterval(timer.current); 

    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remaindingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </> 
    )
}