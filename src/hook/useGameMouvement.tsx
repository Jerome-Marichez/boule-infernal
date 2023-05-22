import { useState, useEffect } from 'react';

/**
 * @param mapLevel The mapLevel that was previously generated with players & blocks
 * @param blockPerLine The number of blocks per line
 * @param speed The speed of movement. The lower the value, the faster the movement.
 * @returns A Hook with 5 values [mapLevel, blockHit, setKeyPressed, keyPressed, setStop]
 * 
 * moveMap = The new map 
 * 
 * blockHit = The type of block that was hit: "empty | green | wall | goal"
 * 
 * setKeyPressed = A setter function that accept these key pressed: "Up | "Down" | ""
 * 
 * keyPressed = The key name which will be empty after the move done can be used to know if a move has been done by the player
 * 
 * setStop = A setter function that accept true or false to stop the GameMouvement Hook
 */
export default function useGameMovement(mapLevel: Array<number>, blockPerLine: number, speed: number) {

	const [moveMap, setMoveMap] = useState<Array<number>>(mapLevel);
	const [keyPressed, setKeyPressed] = useState<"Up" | "Down" | "">("");
	const [playerDirection, setPlayerDirection] = useState<number>(1);
	const [blockHit, setBlockHit] = useState<"empty" | "green" | "wall" | "goal">("empty");
	const [stop, setStop] = useState(false);


	useEffect(() => {

		const timer = setTimeout(() => {
			if (!stop) {
				// Copy moveMap and find player index
				const newMoveMap = [...moveMap];
				let playerIndex = moveMap.findIndex((value) => value === 4);

				// Keyboard Vertical Movement
				if (keyPressed === "Up" && playerIndex > blockPerLine * 2) {
					playerIndex += -blockPerLine;
					newMoveMap[playerIndex + blockPerLine] = 0;
					setKeyPressed("");
				}

				if (keyPressed === "Down" && playerIndex < newMoveMap.length - blockPerLine * 2) {
					playerIndex += blockPerLine;
					newMoveMap[playerIndex - blockPerLine] = 0;
					setKeyPressed("");
				}

				// Horizontal Movement 
				const horizontalBlock = moveMap[playerIndex + playerDirection * 2];
				if (horizontalBlock !== 0 && playerDirection === 1) { setPlayerDirection(-1); }
				if (horizontalBlock !== 0 && playerDirection === -1) { setPlayerDirection(1); }

				// Vertical / Horziontal Collision 
				const verticalBlock = moveMap[playerIndex + playerDirection];
				const verticalBlock2 = moveMap[playerIndex]; 
				if (verticalBlock === 0 || horizontalBlock === 0 || verticalBlock2 === 0) {
					setBlockHit("empty");
				}

				if (verticalBlock === 1 || horizontalBlock === 1 || verticalBlock2 === 1) {
					setBlockHit("green");
				}

				if (verticalBlock === 2 || horizontalBlock === 2 || verticalBlock2 === 2) {
					setBlockHit("wall");
				}

				if (verticalBlock === 3 || horizontalBlock === 3 || verticalBlock2 === 3) {
					newMoveMap[playerIndex + playerDirection * 2] = 0;
					setBlockHit("goal");
				}

				// Update moveMap
				newMoveMap[playerIndex] = 0;
				newMoveMap[playerIndex + playerDirection] = 4;
				setMoveMap(newMoveMap);
			}
		}, speed);

		return () => clearTimeout(timer);

	}, [moveMap, keyPressed, playerDirection, blockPerLine, blockHit, speed, stop]);

	return [moveMap, blockHit, setKeyPressed, keyPressed, setStop] as const;

}