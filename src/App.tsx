import React from 'react';
import './App.scss';
import { defaultMapLevel } from "./utils/mapData"
import { mapGenerator } from './utils/mapGenerator';
import Game from './scene/Game';

function App() {

  let myMap = new mapGenerator(defaultMapLevel, 7, 7);
  myMap.addPlayersMap(15);
  myMap.onePlayerMap();


  return (
    <div className="center">
      <Game heightGame={500} widthGame={300} mapLevel={myMap.level} speed={40} />
    </div>
  );
}

export default App;
