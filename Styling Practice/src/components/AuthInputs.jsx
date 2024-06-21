import { useState } from 'react';
// import { styled } from 'styled-components';

import Button from './Button.jsx';
import Input from './Input.jsx';

 // is a so-called tagged template, which is a regular JS feature.
 // it is like a function which receives this template literal as an input
 // and now this template literal which should now contain all the styles we want to apply to this div here
 // can write standard CSS code in here
 // this will automatically return us a div that has these styles applied to it
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div
      id="auth-inputs"
      className='w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800'
    >
      {/* <ControlContainer> */}
      <div className='flex flex-col gap-2 mb-6'>
          {/* <Label className={`label ${emailNotValid ? 'invalid' : ''}`}>Email</Label> */}
          {/* <Label $invalid={emailNotValid}>Email</Label> */}
          <Input
            label="Email"
            type="email"
            invalid={emailNotValid}
            // style={{
            //   backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5b'
            // }}
            // className={emailNotValid ? 'invalid' : undefined} // not preferred
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        <p>
          {/* these styled components do not just use the children prop so that we can wrap them around context */}
          {/* but they also forward all props we're setting on styled components to the underlying built in JSX element */}
          {/* <Label className={`label ${passwordNotValid ? 'invalid' : ''}`}>Password</Label> */}
          {/* <Label $invalid={passwordNotValid}>
            Password
          </Label> */}
          <Input
            label="Password"
            type="password"
            invalid={passwordNotValid}
            // className={passwordNotValid ? 'invalid' : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      {/* </ControlContainer> */}
      </div>
      {/* <Label> */}
      <div className='flex justify-end gap-4'>
        <button type="button" className="text-amber-400 hover:text-amber-500">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      {/* </Label> */}
      </div>
    </div>
  );
}