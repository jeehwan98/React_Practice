import { Suspense } from 'react';
import { Link, useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem.js';
import EventsList from '../components/EventsList.js';

function EventDetailPage() {
    // const data = useRouteLoaderData('event-detail');
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event.' },
            {
                status: 500
            }
        )
    } else {
        // const data = await response.json(); // Parse the JSON response
        // console.log('Fetched data:', data.event);
        const resData = await response.json();
        return resData.event;
    }
}

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

export function loader({ request, params }) { // object contains 2 important pieces 1. request, 2. params
    const id = params.eventId;

    return defer({
        event: loadEvent(id),
        events: loadEvents(),
    });
}

// after stating the loader function, we have to state it in the root component, which is the App.js


export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method, // logic writthen in `EventItem` component
    });

    if (!response.ok) {
        throw json(
            { message: 'Could not delete event.' },
            {
                status: 500
            }
        );
    }
    return redirect('/events');
}