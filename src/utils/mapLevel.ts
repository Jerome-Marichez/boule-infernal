/** 0 = empty block */
/** 1 = green block */
/** 2 = wall block */
/** 3 = goal block */
export const defaultMapLevel: Array<number> = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]

/**
 * @param defaultMapLevel The default map level with only green blocks and the length of the map.
 * @param numberWall The maximum number of wall blocks to be generated.
 * @param numberGoal The maximum number of goal blocks to be generated.
 * @returns An array representing the generated map with all blocks.
 */
export function generateMapLevel(defaultMapLevel: Array<number>, numberWall: number, numberGoal: number): Array<number> {
	const generateMapLevel = defaultMapLevel.map((value) => {
		// Random a number 
		const randomNumber = Math.round((Math.random() * 50))

		// Do not replace green blocks in the default map level.
		if (value === 1 || randomNumber === 1) return value;

		// Do not generate wall blocks if the maximum number of wall blocks has been reached.
		if (randomNumber === 2 && numberWall > 0) {
			numberWall--;
			return randomNumber;
		}

		// Do not generate goal blocks if the maximum number of goal blocks has been reached.
		if (randomNumber === 3 && numberGoal > 0) {
			numberGoal--;
			return randomNumber;
		}

		return value;
	})

	return generateMapLevel;
}

/**
 * @param generateMapLevel The Map Level Generated with all blocks except player
 * @param blockPerLine The number of lines per row (default is 15)
 * @return An array representing the generated map with all possible starting player choices.
 */
export function addPlayersMap(generateMapLevel: Array<number>, blockPerLine: number): Array<number> {

	let startIndex = blockPerLine;

	while (startIndex < generateMapLevel.length) {
		const endIndex = startIndex + blockPerLine;
		let tmpArray = generateMapLevel.slice(startIndex, endIndex).filter(blockValue => blockValue === 0);

		if (tmpArray.length > 12) {
			generateMapLevel[startIndex + 1] = 4;
		} else {
			tmpArray = [];
		}
		startIndex = endIndex;
	}

	return generateMapLevel;
}

/**
 * 
 * @param generateMapLevel The Map Level Generated with all blocks includes players choice
 * @return An array representing the generated map with only one player starting choice
 */
export function onePlayerMap(generateMapLevel: Array<number>): Array<number> {
	
	const playersIndex = generateMapLevel.reduce((array, blockValue, index) => {
		if (blockValue === 4) {
			array.push(index);
		}
		return array;
	}, [] as number[]);

	const rndPlayerIndex = Math.floor(Math.random() * playersIndex.length);
	const onePlayerIndex = playersIndex[rndPlayerIndex];

	const newGenerateMapLevel = generateMapLevel.map((value) => value === 4 ? 0 : value);
	newGenerateMapLevel[onePlayerIndex] = 4;

	return newGenerateMapLevel;
}
