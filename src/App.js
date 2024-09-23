import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const shift = 3; // You can change the shift value for the Caesar cipher

  const encrypt = (text) => {
    return text.split('').map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const base = char.charCodeAt(0) < 97 ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
      }
      return char; // Return non-alphabet characters unchanged
    }).join('');
  };

  const decrypt = (text) => {
    return text.split('').map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const base = char.charCodeAt(0) < 97 ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
      }
      return char; // Return non-alphabet characters unchanged
    }).join('');
  };

  const handleEncrypt = () => {
    const encryptedText = encrypt(input);
    setOutput(encryptedText);
    setIsEncrypted(true); // Mark that the text is encrypted
  };

  const handleDecrypt = () => {
    if (isEncrypted) {
      setOutput(decrypt(output)); // Decrypt the currently displayed output
    }
  };

  return (
    <div className="App">
      <h1>Caesar Cipher</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text"
      />
      <div>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <h2>Output:</h2>
      <p>{output}</p>
    </div>
  );
};

export default App;
