import React from 'react';
import './App.scss';
import Game from './scene/Game';

function App() {
  return (
    <div className="center">
      <Game heightGame={500} widthGame={300} />
    </div>
  );
}

export default App;
