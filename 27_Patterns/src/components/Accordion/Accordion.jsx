import { createContext, useContext, useState } from "react"
import AccordionItem from "./AccordionItem.jsx";
import AccordionTitle from "./AccordionTitle.jsx";
import AccordionContent from "./AccordionContent.jsx";

const AccordionContext = createContext();

export function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if (!ctx) {
        throw new Error('Accordion-related components must be wrapped by <Accordion>');
    }

    return ctx;
}

export default function Accordion({ children, className }) {
    const [openItemId, setOpenItemId] = useState();

    function toggleItem(id) {
        // update the state based on what the state was previously stored with
        setOpenItemId(prevId => prevId === id ? null : id) // prevId: get previous value automatically from React and return the value that should be stored
    }

    const contextValue = {
        openItemId, // open 1 item at a time
        toggleItem
    }

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className}>{children}</ul>
        </AccordionContext.Provider>
    )
}

// name is up to us
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;