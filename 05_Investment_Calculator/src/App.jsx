import { useState } from 'react';
import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';

function App() {
  const [ anything, setAnything ] = useState('');

  // this was initially written in the UserInput file, but is brought up to App component so that we can use the data in the Results component
  const [ userInput, setUserInput ] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  // boolean, depending on whether the user input is valid or not (positive and not - or negative for the duration)
  const inputIsValid = userInput.duration >= 1;

  // need to write logic to get hold of the value that's entered by the user and reflect that value back into the input field
  function handleChange(inputIdentifier, newValue) { // newValue: that was entered for a given value
    setUserInput(prevUserInput => {                  // update the state based on the previous state value
        return {
            ...prevUserInput,                        // spread the old user input state object into the new object
            // overwrite one single property of that object ... dynamically set a property depending on which value is stored in inputIdentifier
            [inputIdentifier]: +newValue             // adding a + will force a conversion of the string value to a number value 
        }
    });
  }

  return (
    <main> {/* one root JSX element, which then may contain as many children and sibling elements as needed */}
      <Header />
      {/* this line of code is written in order to send the datas to the UserInput component */}
      <UserInput userInput={userInput} onChange={handleChange} />
      {/* Results go here */}
      {!inputIsValid && <p className='center'>Please enter a duration greater than zero</p>}
      {inputIsValid && <Results input={userInput}/>} {/* through this, we are able to share the state with 2 different components that need the state */}
    </main>
  )
}

export default App
