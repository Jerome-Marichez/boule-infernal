import "./Game.scss";
import { Block } from "../components/Block/Block";
import { Player } from "../components/Player/Player";
import useGameMovement from "../hook/useGameMouvement";
import useGameState from "../hook/useGameState";
import { useEffect } from "react";
import useLoopMusic from "../hook/useLoopMusic";


interface Game {
	heightGame: number;
	widthGame: number;
	map: any;
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

export default function Game({ heightGame, widthGame, map, speed }: Game): JSX.Element {

	const [moveMap, blockHit, setKeyPressed, keyPressed, setStop] = useGameMovement(map.level, 15, speed);
	const [score, gameOver] = useGameState(blockHit, map.numberGoal);

	// Music Game Scene Theme in Loop
	const audio: any = new Audio(require(`./theme.wav`));
	useLoopMusic(keyPressed, audio, 42000);

	// Stop Game Mouvement if GameOver
	useEffect(() => {
		setStop(gameOver);
	}, [gameOver, setStop])

	// Draw the map
	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);

	return (
		<div className={gameOver ? "background dead" : "background"} style={{
			width: `${widthGame}px`,
			height: `${heightGame}px`,
			padding: `${topStart}px`,
		}}>
			<div className="game">
				{moveMap.map((value, index) => {
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