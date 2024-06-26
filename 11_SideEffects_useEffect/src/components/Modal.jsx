import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {

  const dialog = useRef();
  // this ref will not be set because the JSx code below hasn't been executed, causing an error of the close to occur because the ref={dialog} hasn't been defined
  // therefore, in order to establish a connection between the two, we use useEffect, because it helps to synchronize the props to the DOM APIs like the dialog.current.showModal methods
  // like how we studied before that the useEffect occurs after all the components in that particular components are executed, this is the reason why we can use the useEffect method
  // and also because the open and close of the modal doesn't have an impact on the JSX code down below, it is a side Effect, letting us use the useEffect

  // dialog.current.showModal(); // only when we write showModal, the backdrop will be added

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
