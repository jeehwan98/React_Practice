import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// eg -> parse the item back to the object or array if exist, if not, return back an empty array
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; // return back the selected places, if not an empty array
const storedPlaces = storedIds.map(id =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {

  // const modal = useRef(); // we're switching from managing the modal in an imperative way to managing it in a declarative way
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const selectedPlace = useRef();
  // we need state 
  const [ availablePlaces, setAvailablePlaces ] = useState([]);
  const [ pickedPlaces, setPickedPlaces ] = useState(storedPlaces);

  /* unlike useState and useRef, useEffect doesn't return a value and instead, requires 2 arguments
   * 1. effect function (contains the logic) -> executed after the component has been rendered
   * 2. dependency array -> if any value in the array changes between renders, the effect will re-run.
   * -> if the array is empty, the effect runs only once after the initial render
   * :: "run this effect if any of these variables change"
   * this useEffect will only be executed by react after every component execution
   */

  // we can merge these 2 useEffects, or write separately

  useEffect(() => {
    // getting the user's location
    // this function will be called once the location has been returned

    // this code is a sideEffect because this code is needed by the App, but is not directly related to the main Task of the App
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      ); // also provide latitude and longitude of the user's location
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /* `localStorage` overview
     * -> it is a web storage API provided by browsers that allow us to store key-value paris in a web browsers
     * -> data stored in the 'localStorage' persists even after the browser is closed and reopened
     * -> 'localStorage' can only store strings
     * `JSON.stringify` is a method that converts a JS object or array into JSON string
     * to convert the string back to the original array or object, we use `JSON.parse`
     * */

    /* this code here is a side effect, but we do not need to write this block of code into the useEffect */

    // make sure not to store existing ids
    if (storedIds.indexOf(id) === -1) { // not in the storedIds
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);

    // eg -> parse the item back to the object or array if exist, if not, return back an empty array
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];    // return back the selected places, if not an empty array
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)) // filter -> help us build a new array based on the array in the storedIds and some filtering conditions
    );
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          // this text will be rendered for the time while bringing the places
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
