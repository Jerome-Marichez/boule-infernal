// see "./mapData.ts" to get a sample default map
/* 0 = empty block */
/* 1 = green block */
/* 2 = wall block */
/* 3 = goal block */
/* 4 = player  */

import { Level } from "../sharedTypes/map";
export class MapGenerator {
	level: Level;
	numberWall: number;
	numberGoal: number;
	numberMaxWall: number;
	numberMaxGoal: number;

	/**
	 * @param defaultMapLevel The default map level with only green blocks and the length of the map.
	 * @param numberMaxWall The maximum number of wall blocks that can be generated.
	 * @param numberMaxGoal The maximum number of goal blocks that can be generated.
	 * @return A object with 5 propriety
	 *
	 * level = The map level
	 *
	 * numberMaxWall: The maximum number of wall blocks that can be generated.
	 *
	 * numberMaxGoal: The maximum number of goal blocks that can be generated.
	 *
	 * numberWall = The number of wall truly in the level
	 *
	 * numberGoal = The number of goal truly in the level
	 *
	 *
	 */

	constructor(
		defaultMapLevel: Level,
		numberMaxWall: number,
		numberMaxGoal: number
	) {
		this.level = defaultMapLevel;
		this.numberWall = 0;
		this.numberGoal = 0;
		this.numberMaxWall = numberMaxWall;
		this.numberMaxGoal = numberMaxGoal;

		this.generateMapLevel();
	}

	/**
	 *@returns An object with the updated property "level","numberWall","numberGoal" representing the generated map.
	 */
	generateMapLevel() {
		this.level = this.level.map((value) => {
			// Do not replace green blocks in the map level.
			if (value === 1) return value;

			// Random a number
			const randomNumber = Math.round(Math.random() * 40);

			// Do not generate wall blocks if it reach maximum number of wall blocks has been reached.
			if (randomNumber === 2 && this.numberWall < this.numberMaxWall) {
				this.numberWall++;
				return randomNumber;
			}

			// Do not generate goal blocks if the maximum number of goal blocks has been reached.
			if (randomNumber === 3 && this.numberGoal < this.numberMaxGoal) {
				this.numberGoal++;
				return randomNumber;
			}

			return value;
		});

		// Ensure that the previous or next block in the map cannot be a goal or wall if it is currently a goal or wall block.
		// Check too that a goal can't have a goal above him
		return this.level = this.level.map((value, index, array) => {
			const [previousValue, previousValueDouble] = [array[index - 1], array[index - 2]];
			const [aboveGoalLeft, aboveGoalTop, aboveGoalRight] = [array[index - 16], array[index - 15], array[index - 14]];
			const [nextValue, nextValueDouble] = [array[index + 1], array[index + 2]];

			const isPreviousValueGoalOrWall = previousValue === 2 || previousValue === 3;
			const isNextValueGoalOrWall = nextValue === 2 || nextValue === 3;
			const isPreviousValueDoubleGoalOrWall = previousValueDouble === 2 || previousValueDouble === 3;
			const isNextValueDoubleGoalOrWall = nextValueDouble === 2 || nextValueDouble === 3;
			const isAboveGoal = aboveGoalLeft === 3 || aboveGoalRight === 3 || aboveGoalTop === 3;

			if (isPreviousValueGoalOrWall || isNextValueGoalOrWall || isPreviousValueDoubleGoalOrWall || isNextValueDoubleGoalOrWall) {
				if (value === 2) {
					this.numberWall--;
					return 0;
				}
				if (value === 3) {
					this.numberGoal--;
					return 0;
				}
			}

			if (isAboveGoal && value === 3) {
				this.numberGoal--;
				return 0;
			}

			return value;
		});


		//
	}

	/**
	 * @returns An object with the updated property "level" representing the generated map, including all possible starting player choices display at "4" in the array
	 */
	addPlayersMap(blockPerLine: number): Array<number> {
		let startIndex = blockPerLine;

		while (startIndex < this.level.length) {
			const endIndex = startIndex + blockPerLine;
			let tmpArray = this.level
				.slice(startIndex, endIndex)
				.filter((blockValue) => blockValue === 0);

			if (tmpArray.length > blockPerLine - 3) {
				this.level[startIndex + 1] = 4;
			} else {
				tmpArray = [];
			}
			startIndex = endIndex;
		}

		return this.level;
	}

	/**
	 * @returns An object with the updated property "level" representing the generated map with only one player starting choice
	 */
	onePlayerMap(): Array<number> {
		const playersIndex = this.level.reduce((array, blockValue, index) => {
			if (blockValue === 4) {
				array.push(index);
			}
			return array;
		}, [] as number[]);

		const rndPlayerIndex = Math.floor(Math.random() * playersIndex.length);
		const onePlayerIndex = playersIndex[rndPlayerIndex];

		this.level = this.level.map((value) => (value === 4 ? 0 : value));
		this.level[onePlayerIndex] = 4;

		return this.level;
	}
}
