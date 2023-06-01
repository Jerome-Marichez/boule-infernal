import './App.scss';
import { defaultMapLevel } from "./utils/mapData"
import { mapGenerator } from './utils/mapGenerator';
import { useSelector } from 'react-redux';
import { rootState } from './redux/store';
import { useState } from 'react';
import Game from './scene/Game';
import HighScore from './scene/HighScore';
import MusicLoop from './components/MusicLoop/MusicLoop';

function App() {

  // Internal State 
  const [displayHighScore, setDisplayHighScore] = useState(false);

  // Redux State
  const speed = useSelector((state: rootState) => state.gameState.speed)
  const gameOver = useSelector((state: rootState) => state.gameState.gameOver)

  // Get myMap
  let myMap = new mapGenerator(defaultMapLevel, 8, 8);
  myMap.addPlayersMap(15);
  myMap.onePlayerMap();


  if (gameOver) {
    setTimeout(() => { setDisplayHighScore(true) }, 2000)
  }


  return (
    <div className="center">
      <MusicLoop music={"gameover"} mute={gameOver ? false : true} />
      <MusicLoop music={"theme"} mute={gameOver ? true : false} />
      {displayHighScore ?
        <HighScore />
        :
        <Game heightGame={500} widthGame={300} map={myMap} speed={speed} key={speed} />
      }
    </div>
  );
}


export default App;
