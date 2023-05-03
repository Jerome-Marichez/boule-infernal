import React from 'react';
import './App.scss';
import Game from './scene/Game';

function App() {
  return (
    <div className="center">
      <Game heightGame={825} widthGame={480} />
    </div>
  );
}

export default App;
