import { useState } from "react"

export default function NewTask({ onAdd}) {
    const [ enteredTask, setEnteredTask ] = useState('');
    /* 
     * 1. forward the entered value to the app component
     * 2. reset it back to an empty string
    */

    function handleClick() {
        if (enteredTask.trim() === '') {
            return;
        }
        onAdd(enteredTask); // once we entered the input that we want to delete, we are able to get the value all the way from the root, which is the App
        setEnteredTask('');
    }

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }
    // when we press the button, we need to forward the task information to the place where it can be stored

    return (
        <div className="flex items-center gap-4">
            <input
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                type="text"
                onChange={handleChange}
                value={enteredTask}
            />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleClick}
            >Add Task</button>
        </div>
    )
}