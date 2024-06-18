import Header from './components/Header.jsx';
import InputBox from './components/InputBox.jsx';

import { useState } from 'react';

function App() {
  const [ anything, setAnything ] = useState('');

  return (
    <main>
      <Header />
      <InputBox />
    </main>
  )
}

export default App
