import { useState, useEffect } from 'react';

/**
 * @param mapLevel The mapLevel that was previously generated with players & blocks
 * @param blockPerLine The number of blocks per line
 * @param speed The speed of movement. The lower the value, the faster the movement.
 * @returns A array of 3 values [mapLevel, blockHit, setKeyPressed]
 * 
 * mapLevel = The new map 
 * 
 * blockHit =  The type of block that was hit: "empty | green | wall | goal"
 * 
 * setKeyPressed =  A callback function that accept these key pressed: "Up | "Down" | ""
 * 
 */

export default function useGameMovement(mapLevel: Array<number>, blockPerLine: number, speed: number) {

	const [moveMap, setMoveMap] = useState<Array<number>>(mapLevel);
	const [keyPressed, setKeyPressed] = useState<"Up" | "Down" | "">("");
	const [playerDirection, setPlayerDirection] = useState<number>(1);
	const [blockHit, setBlockHit] = useState<"empty" | "green" | "wall" | "goal">("empty");

	useEffect(() => {
		const timer = setTimeout(() => {
			// Copy moveMap and find player index
			const newMoveMap = [...moveMap];
			let playerIndex = moveMap.findIndex((value) => value === 4);

			// Keyboardpress Vertical Movement
			if (keyPressed === "Up" && playerIndex > blockPerLine * 2) {
				playerIndex += -15;
				newMoveMap[playerIndex + blockPerLine] = 0;
				setKeyPressed("");
				setBlockHit("green");
			}

			if (keyPressed === "Down" && playerIndex < newMoveMap.length - blockPerLine * 2) {
				playerIndex += 15;
				newMoveMap[playerIndex - blockPerLine] = 0;
				setKeyPressed("");
				setBlockHit("green");
			}

			// Horizontal Movement
			const nextBlock = moveMap[playerIndex + playerDirection * 2];
			if (nextBlock !== 0 && playerDirection === 1) { setPlayerDirection(-1); }
			if (nextBlock !== 0 && playerDirection === -1) { setPlayerDirection(1); }

			if (nextBlock === 3) {
				newMoveMap[playerIndex + playerDirection * 2] = 0;
				setBlockHit("goal");
			}

			if (nextBlock === 2) {
				setBlockHit("wall");
			}

			// Update moveMap
			newMoveMap[playerIndex] = 0;
			newMoveMap[playerIndex + playerDirection] = 4;
			setMoveMap(newMoveMap);

		}, 40);

		return () => clearTimeout(timer);
	}, [moveMap, keyPressed, playerDirection, blockPerLine, blockHit]);

	return [moveMap, blockHit, setKeyPressed];

}