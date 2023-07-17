import './App.scss';
import { defaultMapLevel } from "./data/mapData"
import { MapGenerator } from './utils/mapGenerator';
import { useSelector } from 'react-redux';
import { rootState } from './redux/store';
import { useState } from 'react';
import { MusicLoop } from './components';
import Game from './scene/Game';
import HighScore from './scene/HighScore';


function App() {

  // Internal State 
  const [displayHighScore, setDisplayHighScore] = useState(false);

  // Redux State
  const speed = useSelector((state: rootState) => state.gameState.speed)
  const gameOver = useSelector((state: rootState) => state.gameState.gameOver)
  const mute = useSelector((state: rootState) => state.gameState.mute)

  // Get myMap
  let myMap = new MapGenerator(defaultMapLevel, 10, 10);
  let a = 1;
  while (a === 1) {
    if (myMap.numberWall > myMap.numberMaxWall / 2 && myMap.numberGoal > myMap.numberMaxGoal  / 2) {
      a = 0;
    } else {
      myMap = new MapGenerator(defaultMapLevel, 10, 10);
    }
  }
  myMap.addPlayersMap(15);
  myMap.onePlayerMap();

  if (gameOver) {
    setTimeout(() => { setDisplayHighScore(true) }, 2000)
  }

  return (
    <div className="center">
      {<MusicLoop music={"gameover"} mute={gameOver ? mute : true} />}
      <MusicLoop music={"theme"} mute={gameOver ? true : mute} />
      {displayHighScore ?
        <HighScore />
        :
        <Game heightGame={500} widthGame={300} map={myMap} speed={speed} key={speed} />
      }
    </div>
  );
}


export default App;
