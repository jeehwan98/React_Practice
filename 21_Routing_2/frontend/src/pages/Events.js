import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    const { events } = useLoaderData(); // we will always get the final data that would be yielded by the promise with the help of useLoaderData

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }
    // const events = data.events;

    // return (
    //     <>
    //         <EventsList />
    //     </>
    // );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: 'Could not fetch events.' },
            {
                status: 500
            },
        );
    } else {
        // return response;
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() { // get rid of async
    // bring the code out and create a new function `loadEvents`, just outside of this function
    // this is done as we don't want to await the promises in the loadEvents function
    // use `defer();` from react-router-dom
    return defer({ // we pass an object
        events: loadEvents(), // execute the code
    });
}