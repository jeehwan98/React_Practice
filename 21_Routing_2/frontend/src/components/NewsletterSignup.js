import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    const fetcher = useFetcher(); // gives us an object when executed, which includes bunch of useful properties and method
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) { // this means that we're not executing an action or a loader anymore
            window.alert(data.message);

        }
    }, [data, state]);

    return (
        <fetcher.Form // this allows us to stay on the page to complete the logic. if we used `Form`, we would to directed to the root URL that we've inputted in the App.js
            method="post"
            action="/newsletter"
            className={classes.newsletter}
        >
            <input
                type="email"
                name="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;