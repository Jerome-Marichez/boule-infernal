import "./Game.scss";
import { Block } from "../components/Block/Block";
import { Player } from "../components/Player/Player";
import useGameMovement from "../hook/useGameMouvement";
import useBlockhit from "../hook/useBlockHit";

interface Game {
	heightGame: number;
	widthGame: number;
	mapLevel: Array<number>;
	speed: number;
}

/**
 * Renders a game scene with a playable screen area of given height and width
 * @param heightGame The height of the playable screen area
 * @param widthGame The width of the playable screen area
 * @param mapLevel The map level already pre-generated
 * @param speed The speed of movement. The lower the value, the faster the movement.
 * @returns The game scene where the magic happens
 */

export default function Game({ heightGame, widthGame, mapLevel, speed }: Game): JSX.Element {

	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);


	const [moveMap, blockHit, setKeyPressed] = useGameMovement(mapLevel, 15, speed);
	const [score, gameOver] = useBlockhit(blockHit);



	if (moveMap instanceof Array) {
		return (

			<div className="background" style={{
				width: `${widthGame}px`,
				height: `${heightGame}px`,
				padding: `${topStart}px`,
			}}>
				<div className="game">
					{moveMap.map((value) => {
						let element: JSX.Element = <></>;

						const createSprite = (type: "empty" | "green" | "wall" | "goal" | "player") => (
							type === "player" ?

								<Player
									leftPosition={leftStart}
									topPosition={topStart}
									pixelSize={pixelSize}
									setKeyPressed={setKeyPressed}
								/>
								:
								<Block
									leftPosition={leftStart}
									topPosition={topStart}
									pixelSize={pixelSize}
									type={type}
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
	}
	else {
		return <div></div>;
	}

}