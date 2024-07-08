import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
    const data = useRouteLoaderData('event-detail');
    console.log('Edit Event Page', data);

    return (
        <>
            {/* <p>{event}</p> */}
            <EventForm method="patch" event={data.event} />
        </>
    )
}

export default EditEventPage;