import { useRef } from "react";
import InputTexts from "./InputTexts.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if (
            enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === ''
        ) {
            // show error modal
            modal.current.open();
            return; // called so that the code thereafter, will not be executed if no values are inputted
        }

        // through this, we're passing the argument from the NewProject to the App.jsx
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    // function saveData(event) {
    //     event.preventDefault();
    //     console.log('Form Data saved:', formData);
    // }

    return (
        <>
        <Modal ref={modal} buttonCaption="Close">
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
            <p className="text-stone-600 mb-4">
                Oops ... looks like you forgot to enter a value.
            </p>
            <p className="text-stone-600 mb-4">
                Please make sure you provide a valid value for every input field
            </p>
        </Modal>
        <div className="w-[35rem] mt-16">
            {/* // onSubmit={saveData} */}
        
            <menu className="flex items-center justify-end gap-4 my-4">
                <li className="flex justify-between my-4">
                    <button
                    className="text-stone-800 hover:text-stone-950"
                    onClick={onCancel}
                    >
                        Cancel
                    </button>
                </li>
                <li className="flex justify-between my-4">
                    <button
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </li>
            </menu>
            <div className="items-center gap-4">
                <InputTexts
                    label="Title"
                    ref={title}
                    type="text"
                    // value={formData.title}
                    // onChange={(e) => onInputChange('title', e.target.value)}
                />
                <InputTexts
                    label="Description"
                    textarea
                    ref={description}
                    type="text"
                    // value={formData.description}
                    // onChange={(e) => onInputChange('description', e.target.value)}
                />
                <InputTexts
                    label="Due Date"
                    ref={dueDate}
                    type="date"
                    // formData={formData}
                    // value={formData.dueDate}
                    // onChange={(e) => onInputChange('dueDate', e.target.value)}
                />
            </div>
        </div>
        </>
    )
}