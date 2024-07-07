import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {
    function submitHandler(event) {
        event.preventDefault();
    }
    return (
        <EventForm />
    )
}

export default NewEventPage;

export async function action({ request, params }) { // this code executes in the browser
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        description: data.get('description'),
        date: data.get('date'),
    }

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // so that data is handled and extracted correctly on the backend
        },
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        // ...
        throw json({ message: 'Could not save event.' }, {
            status: 500
        });
    } else {
        return redirect('/events'); // creates a special object that simply redirects the user to a different page
    }
}