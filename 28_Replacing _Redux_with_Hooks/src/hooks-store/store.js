import { useEffect, useState } from "react";

// they are just normal variables
let globalState = {}; // created once when the file is first imported
let listeners = [];
let actions = {};

// making custom hooks
export const useStore = (shouldListen = true) => { // set a default parameter value
    // have some mechanism that could lead to other components to re-render
    // since useState allows us to manage a state and whenever we update that state, any component that uses useState will re-render
    const setState = useState(globalState)[1]; // write only setState as we're only interested in the second value

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload); // action should be a function
        globalState = { ...globalState, ...newState }; // merge old state with new state

        // go through all the listeners
        // what this does is update the React state with new global state
        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
        }

        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState); // clean out
            }
        }
    }, [setState, shouldListen]);

    return [globalState, dispatch];
};

// initializes the global state and actions
export const initStore = (userActions, initialState) => {
    if (initialState) { // if initial state is provided, merge it with the existing global state
        globalState = { ...globalState, ...initialState }; // merge
    }

    actions = { ...actions, ...userActions }; // merge user-defined actions with the existing actions
    // this allows us to define custom actions that can modify the global state
}