import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './scene/Game';

function App() {
  return (
    <div className="center">
      <Game heightGame={500} widthGame={300} />
    </div>

  );
}

export default App;
