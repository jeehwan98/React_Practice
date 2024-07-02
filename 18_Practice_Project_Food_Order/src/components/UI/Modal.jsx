import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef(); // used to get access to the dialog element
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open])
    return createPortal( // pass dialog as the first argument, and the code that selects an element in the real DOM
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> {/* were we to write open={open}, we would be opening the modal the programatically, which is not what we want */}
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}