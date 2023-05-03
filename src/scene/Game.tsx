
import { Block } from "../components/Block";
import "./Game.scss";
import { generateMapLevel, defaultMapLevel } from "../utils/mapLevel";

interface Game {
	heightGame: number;
	widthGame: number;
}

/**
 * Renders a game scene with a playable screen area of given height and width
 *
 * @param heightGame The height of the playable screen area
 * @param widthGame The width of the playable screen area
 * @returns The game scene where the magic happens
 */
export default function Game({ heightGame, widthGame }: Game): JSX.Element {

	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);

	
	const myMapLevel = generateMapLevel(defaultMapLevel, 7, 7);
	
	return (
		<div className="background" style={{
			width: `${widthGame}px`,
			height: `${heightGame}px`,
			padding: `${topStart}px`,
		}}>
			<div className="game">
				{myMapLevel.map((value) => {
					let element: JSX.Element = <></>;
					const createBlock = (type: "empty" | "green" | "wall" | "goal") => (
						<Block
							leftPosition={leftStart}
							topPosition={topStart}
							pixelSize={pixelSize}
							type={type}
						/>
					);

					switch (value) {
						case 1:
							element = createBlock("green");
							break;
						case 2:
							element = createBlock("wall");
							break;
						case 3:
							element = createBlock("goal");
							break;
						default:
							element = createBlock("empty");
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