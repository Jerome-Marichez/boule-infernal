import "./Game.scss";
import { Block, Player } from '../components';
import useGameMovement from "../hook/useGameMouvement";
import useGameState from "../hook/useGameState";
import { useEffect } from "react";

interface GameProps {
	heightGame: number;
	widthGame: number;
	map: {
		level: Array<number>;
		numberWall: number;
		numberGoal: number;
	};
	speed: number;
}


/**
 * Renders a game scene with a playable screen area of given height and width
 * @param heightGame The height of the playable screen area
 * @param widthGame The width of the playable screen area
 * @param map A Object not yet typed
 * @param speed The speed of movement. The lower the value, the faster the movement.
 * @returns The game scene where the magic happens
 */


export default function Game(props: GameProps): JSX.Element {
	
	const { heightGame, widthGame, map, speed } = props; 
	const [moveMap, blockHit, setKeyPressed, setStop] = useGameMovement(map.level, 15, speed);
	const [score, gameOver] = useGameState(blockHit, map.numberGoal);

	// Stop Game Mouvement if GameOver
	useEffect(() => {
		setStop(gameOver);
	}, [gameOver, setStop])


	// Draw the map
	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);

	return (
		<div className={gameOver ? "game dead" : "game"} style={{
			width: `${widthGame}px`,
			height: `${heightGame}px`,
			padding: `${topStart}px`,
		}}>

			<div className="background">
				{moveMap.map((value, index): JSX.Element => {
					let element: JSX.Element = <></>;

					const createSprite = (type: "empty" | "green" | "wall" | "goal" | "player") => (
						type === "player" ?

							<Player
								leftPosition={leftStart}
								topPosition={topStart}
								pixelSize={pixelSize}
								setKeyPressed={setKeyPressed}
								sound={blockHit}
								key={index}
							/>
							:
							<Block
								leftPosition={leftStart}
								topPosition={topStart}
								pixelSize={pixelSize}
								type={type}
								key={index}
							/>

					);

					switch (value) {
						case 1:
							element = createSprite("green");
							break;
						case 2:
							element = createSprite("wall");
							break;
						case 3:
							element = createSprite("goal");
							break;
						case 4:
							element = createSprite("player");
							break;
						default:
							element = createSprite("empty");
							break;
					}

					leftStart = leftStart + pixelSize;

					if (leftStart - pixelSize > widthGame) {
						leftStart = (10 / 100) * widthGame;
						topStart = topStart + pixelSize;
					}

					return element;
				})}
			</div>

		</div>
	)
	// End Drawn the map

}