import { forwardRef } from "react"

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) { // it receives a second argument after the props argument
    return (
        // <dialog className="result-modal" open> {/* the modal can be made visible by adding the open prop to it */}
        // dialog element comes with a built in backdrop element that wil be displayed behind the dialog, but cannot be shown 
        // if we force the dialog to be visible by setting open to true

        // instead we have to open this dialogue programmatically by sending a command to the browser to get this built in backdrop
        // to do that, we just have to make sure that we can access this dialog in the component from inside the timerChallenge component
        <dialog ref={ref} className="result-modal">
            <h2>You {result}</h2>
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>X seconds left</strong>
            </p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
});

export default ResultModal;