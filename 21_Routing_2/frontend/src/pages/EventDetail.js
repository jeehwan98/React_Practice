import { Link, useRouteLoaderData, json, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem.js';

function EventDetailPage() {
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            <EventItem event={data.event} />
            {/* <p>
                <button>
                    <Link to='..' relative="path">Back</Link>
                </button>
            </p> */}
        </>
    )
}

export default EventDetailPage;

export async function loader({ request, params }) { // object contains 2 important pieces 1. request, 2. params
    const id = params.eventId;

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
        return response;
    }
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