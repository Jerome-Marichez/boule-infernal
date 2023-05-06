import React from 'react';
import './App.scss';
import { generateMapLevel, defaultMapLevel, addPlayersMap, onePlayerMap } from "./utils/mapLevel"
import Game from './scene/Game';

function App() {

  let myMapLevel = generateMapLevel(defaultMapLevel, 7, 7);
  myMapLevel = addPlayersMap(myMapLevel, 15);
  myMapLevel = onePlayerMap(myMapLevel);

  return (
    <div className="center">
      <Game heightGame={500} widthGame={300} mapLevel={myMapLevel} />
    </div>
  );
}

export default App;
