import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData(); // we will always get the final data that would be yielded by the promise with the help of useLoaderData

    if (data.isError) {
        return <p>{data.message}</p>
    }
    const events = data.events;

    return (
        <>
            {/* <EventsList events={events} /> */}
            <EventsList />
        </>
    );
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:8080/eventss');

    if (!response.ok) {
        // ... error handling
        // return { isError: true, message: 'Could not fetch events.' };
        // throw { message: 'Could not fetch events' };
        throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            status: 500
        });
    } else {
        // const resData = await response.json();
        // return resData.events;
        // const res = new Response('any data', { status: 201 });
        return response;
    }
}