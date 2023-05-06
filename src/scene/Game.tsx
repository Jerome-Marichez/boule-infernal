
import { Block } from "../components/Block";
import "./Game.scss";
import Player from "../components/Player";
import { useEffect, useState } from "react";

interface Game {
	heightGame: number;
	widthGame: number;
	mapLevel: Array<number>;
}

/**
 * Renders a game scene with a playable screen area of given height and width
 *
 * @param heightGame The height of the playable screen area
 * @param widthGame The width of the playable screen area
 * @param mapLevel The map level already pre-generated
 * @returns The game scene where the magic happens
 */
export default function Game({ heightGame, widthGame, mapLevel }: Game): JSX.Element {

	let topStart: number = (10 / 100) * widthGame;
	let leftStart: number = (10 / 100) * widthGame;
	let pixelSize: number = Math.floor((6.67 / 100) * widthGame);


	const [keyboardPressed, setKeyBoardPressed] = useState("");
	const [moveMap, setMoveMap] = useState<Array<Number>>(mapLevel);
	const [playerDirection, setPlayerDirection] = useState<number>(1);

	console.log(keyboardPressed)

	// Game Movement Logic without Player Interaction
	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("time 1s");
			const newMoveMap = [...moveMap];

			// found player 
			let playerIndex = moveMap.findIndex((value) => value === 4);

			// Keyboardpress Vertical Movement
			if (keyboardPressed === "Up") {
				console.log("c'est up ")
				playerIndex += -15;
				newMoveMap[playerIndex + 15] = 0;
				setKeyBoardPressed("");
			}
			if (keyboardPressed === "Down") {
				playerIndex += 15;
				newMoveMap[playerIndex - 15] = 0;
				setKeyBoardPressed("");
			}
			
			// Horizontal Movement
			const nextBlock = moveMap[playerIndex + playerDirection * 2];
			if (nextBlock !== 0 && playerDirection === 1) { setPlayerDirection(-1); }
			if (nextBlock !== 0 && playerDirection === -1) { setPlayerDirection(1); }

			// set move into Map
			newMoveMap[playerIndex] = 0;
			newMoveMap[playerIndex + playerDirection] = 4;

		
			setMoveMap(newMoveMap);
		}, 50);
		return () => clearTimeout(timer);
	}, [moveMap]);
	// End Player Movement Logic without Player Interaction

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
								setKeyboardPressed={setKeyBoardPressed}
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