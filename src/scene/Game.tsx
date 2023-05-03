
import { Block } from "../components/Block";
import "./Game.scss";
import { mapLevel } from "../utils/mapLevel";

interface Game {
	heightGame: number;
	widthGame: number;
}

/**
 * 
 * @param heightGame Height of the playable screen area
 * @param widthGame Width of the playabable screen area
 * @returns A Game Scene where the Magic Happen
 */
export default function Game({ heightGame, widthGame }: Game): JSX.Element {

	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);

	return (
		<div className="background" style={{
			width: `${widthGame}px`,
			height: `${heightGame}px`,
			padding: `${topStart}px`,
		}}>
			<div className="game">
				{mapLevel.map((value) => {

					let element: JSX.Element = <></>;

					switch (value) {
						case 1:
							element = <Block leftPosition={leftStart} topPosition={topStart}
								pixelSize={pixelSize} />
							break;
						default:
							element = <Block leftPosition={leftStart} topPosition={topStart}
								pixelSize={pixelSize}
								empty={true} />
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