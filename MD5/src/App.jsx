import React, { useState } from 'react';
import crypto from 'crypto-js';

function App() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const calculateMD5 = () => {
    const hash = crypto.MD5(input).toString();
    setHash(hash);
  };

  return (
    <div>
      <h1>Calculadora MD5</h1>
      <input type="text" value={input} onChange={handleInputChange} placeholder="Ingrese el texto" />
      <button onClick={calculateMD5}>Calcular MD5</button>
      <p>Hash MD5: {hash}</p>
    </div>
  );
}

export default App;