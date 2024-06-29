// this is a utility function that can be called to send the request and either get back an error

export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) { // 400 or 500
        throw new Error('Failed to fetch places');
    }
    return resData.places;
}

// GET method is not required, like some other methods such as POST, DELETE, PUT
export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if (!response.ok) { // 400 or 500
        throw new Error('Failed to fetch places');
    }
    return resData.places;
}

/* 2nd argument: configuration argument that allows us to configure the outgoing requests 
 * 1. method: 
 * 2. body: define what data should be attached as a request body to the outgoing request (has to be a format that is attachable -> JSON.stringify())
 * 3. headers: meta-data (tell that it would be in a JSON format)
 * */
export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }
    return resData.message;
}