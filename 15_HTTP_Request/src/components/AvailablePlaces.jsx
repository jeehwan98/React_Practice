import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

// using localStorage, we're able to get the data synchronously
const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // Todo: Fetch available places from the backend API
  // because when we're sending HTTP request, that needs to travel through the internet, to the backend server, where it does some work and sends the data back to the front end
  const [ availablePlaces, setAvailablePlaces ] = useState([]); // data stage
  const [ isFetching, setIsFetching ] = useState(false);        // loading state
  const [ error, setError ] = useState();                       // error state
  /*
   * because the data isn't rendered initially and the component executes instantly,
   * we must first render the component without the data, and update it once the data is available
   * therefore, we first start off with an empty array
   * 
   * next, we send a HTTP request and update the value once the data is received so that we re-render the UI
   */


  /* this is a built in function directed by the browser
   * it is a HTTP request that can be sent to other server
   * fetch('http://localhost:3000'); -> requires the URL of the server that we want to request from
   * this returns a Promise, which is a JS value
   * after getting the value, we can then write our code after that by writing .then((response) => {}) ... a response to get the value only after we got the value from the HTTP request
   * or in the modern JS, we can use the const response = ...
   *  */

  // this is causing an infinite loop to occur
  // fetch('').then((response) => {
  //   return response.json(); // json can be used to extract the data that is attached in the json format
  // }).then((resData) => {
  //   setAvailablePlaces(resData.places);
  // });
  // since it is an infite loop, we can use useEffect to handle the infinite loop problem
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);  // fetching the data
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); // because we're not fetching the data anymore
          
        });

      } catch (error) {
        // handle the UI and show the updated error message onto the screen
        // setError(error);
        setError({message: error.message || 'Could not fetch places, please try again later.'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
    // fetch('http://localhost:3000/places')
    //   .then((response) => {
    //     return response.json(); // json can be used to extract the data that is attached in the json format
    //   })
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Fetching place data..."
      isLoading={isFetching}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
