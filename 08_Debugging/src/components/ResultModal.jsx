import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remaindingTime, onReset }, ref) { // it receives a second argument after the props argument

    /* it is preferable to build this result modal component so that it exposes its own function 
     * that can be called with the help of a ref outside of that component
     * this can be achieved by using the 'useImperativeHandle' hook
     * useImperativeHandle -> helps define properties and methods that should be accesssible on this component here from outside
     * needs 2 arguments
     * 1. ref : which we got from the forwardRef
     * 2. function : that returns an object which groups all the properties and methods that should be exposed by this component to other components
     * */

    /* this is called because we need a separate ref for reaching out to the dialog, because the idea is to detach this dialog element,
     * which is used in this result model from other outer components
     */
    const dialog = useRef();

    const userLost = remaindingTime <= 0;
    const formattedRemaindingTime = (remaindingTime / 1000).toFixed(2); // 2 decimal places
    const score = Math.round((1 - remaindingTime / (targetTime * 1000)) * 100);
    
    
    useImperativeHandle(ref, () => {        // the parent component can now use the `ref` to call the `open` method and show the modal
        return {
            open() {                        // this allows the parent to open the dialog by calling this method
                dialog.current.showModal(); // this allows the parent component to open the modal programatically
            }
        };
    });

    return createPortal(
        // <dialog className="result-modal" open> {/* the modal can be made visible by adding the open prop to it */}
        // dialog element comes with a built in backdrop element that wil be displayed behind the dialog, but cannot be shown 
        // if we force the dialog to be visible by setting open to true

        // instead we have to open this dialogue programmatically by sending a command to the browser to get this built in backdrop
        // to do that, we just have to make sure that we can access this dialog in the component from inside the timerChallenge component
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemaindingTime} seconds left</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
});

export default ResultModal;