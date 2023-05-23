import './App.scss';
import { defaultMapLevel } from "./utils/mapData"
import { mapGenerator } from './utils/mapGenerator';
import { useSelector } from 'react-redux';
import { rootState } from './redux/store';
import Game from './scene/Game';
import { loopMusic } from './utils/loopMusic';
import { useMemo } from 'react';

function App() {

  const speed = useSelector((state: rootState) => state.gameState.speed)

  // Music Background
  const song = `theme.wav`;
  useMemo(() => {
    const music = new Audio(require(`./${song}`));
    loopMusic(music)
  }, [song]);

  // Get myMap
  let myMap = new mapGenerator(defaultMapLevel, 7, 7);
  myMap.addPlayersMap(15);
  myMap.onePlayerMap();

  return (
    <div className="center">
      <Game heightGame={500} widthGame={300} map={myMap} speed={speed} key={speed} />
    </div>
  );
}


export default App;
