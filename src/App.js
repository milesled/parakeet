import React from 'react';
import './App.css';
import tweet from './parakeet-alt.png'
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={tweet} className="logo" alt="" />
          Parakeet
      </header>
      <TextInput/>
    </div>
  );
}

export default App;
