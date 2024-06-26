import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('TIMER SET');
    // we do not need the useEffect function for the setTimeout because setting the time wasn't the problem
    const timer = setTimeout(() => {
      onConfirm(); // after 3 seconds, it'll delete the place
    }, TIMER); 

    // clean up function
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer); // if closed before 3 seconds, it will just close the modal
    }
  }, [onConfirm]);

  // set a timer so that after 3 sceonds, the modal disappers and we delete the place
  /* build in function `setTimeout()`
   * this function requires 2 arguments
   * 1. function
   * 2. time in milliseconds. eg) 3000 -> 3 seconds
   * -> the function is executed after the time in the second argument is expired
  */
  // console.log('TIMER SET');
  // setTimeout(() => {
  //   onConfirm();
  // }, 3000); 

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
