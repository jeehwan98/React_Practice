
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

/* 
 * forwardRef -> make sure that our Modal can receive a ref
 * useImperativeHandle -> expose a function that can be called from outside this component function
 */

const Modal = forwardRef(function Modal ({ children, buttonCaption }, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        /* 
         * provide a function that will be called by react in the end
         * where we return an object that then exposes any properties or functions we want to expose to other
         * */
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });


    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method='dialog' className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, document.getElementById('modal-root')
    );
});

export default Modal;