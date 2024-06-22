import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef();
  const [ enteredPlayerName, setEnteredPlayerNane ] = useState('');
  
  function handleClick() {
    setEnteredPlayerNane(playerName.current.value);
    playerName.current.value = '';  // not declarative
  }

  return (
    <section id="player">
      {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2> */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input
          type="text"
          ref={playerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
