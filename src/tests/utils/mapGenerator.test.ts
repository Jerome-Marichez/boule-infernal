import { MapGenerator } from "../../utils/mapGenerator";
import { defaultMapLevel } from "../../data/mapData";
import { Level } from "../../sharedTypes/map";
import { badMapMock } from "./badMapMock";

describe('MapGenerator Class', () => {
	const numberMaxWall: number = 30;
	const numberMaxGoal: number = 30;

	function toBeLessOrEqual(number1: number, number2: number) {
		if (number1 <= number2) return true;
		return false;
	}

	test('Generate a map without replacing green blocks represented as 1 in the array', () => {
		const myMap = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);
		const greenBlockDefaultMap = defaultMapLevel.filter(a => a === 1);
		const greenBlockGenerateMap = myMap.level.filter(a => a === 1);
		expect(greenBlockDefaultMap.length).toEqual(greenBlockGenerateMap.length);
	})

	test('Ensure that the previous block in the map cannot be a goal or wall if it is currently a goal or wall block.', () => {

		/**
		 * Check if the previous block remains the same when it is a wall or goal block.
		 * @param myArray An array of numbers representing the map.
		 * @returns True if the condition is met, false otherwise.
		 */
		const checkDoubleBlock = (myArray: Level) => {
			let doubleBlock: boolean = false;
			myArray.forEach((element, index, array) => {
				if (element === array[index - 1]) {
					if (element === 2 || element === 3) {
						doubleBlock = true;
					}
				}
			});
			return doubleBlock;
		}

		const { level: firstLevel } = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);
		expect(checkDoubleBlock(firstLevel)).toBeFalsy();

		const { level: secondLevel } = new MapGenerator(badMapMock, numberMaxWall, numberMaxGoal);
		expect(checkDoubleBlock(secondLevel)).toBeFalsy();
	})

	test('Generate Map with good numbers goal or wall', () => {
		const myMap = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);

		expect(myMap.level !== defaultMapLevel).toBeTruthy();

		expect(toBeLessOrEqual(myMap.numberGoal, myMap.numberMaxGoal)).toBeTruthy();
		expect(toBeLessOrEqual(myMap.numberWall, myMap.numberMaxWall)).toBeTruthy();

		expect(myMap.numberGoal).toBeGreaterThan(1);
		expect(myMap.numberWall).toBeGreaterThan(1);

		const numberGoalInMap = myMap.level.filter((a) => a === 3);
		const numberWallInMap = myMap.level.filter((a) => a === 2);
		expect(numberGoalInMap.length).toEqual(myMap.numberGoal);
		expect(numberWallInMap.length).toEqual(myMap.numberWall);
	});

	test('Generate Map with the player starting position chosen within the map.', () => {
		const myMap = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);

		myMap.addPlayersMap(15);
		const maxPlayersPositionInMap = myMap.level.filter((a) => a === 4);
		expect(maxPlayersPositionInMap.length).toBeGreaterThan(2);

		myMap.onePlayerMap();
		const onePlayerMap = myMap.level.filter((a) => a === 4);
		expect(onePlayerMap.length).toEqual(1);
	});

});
