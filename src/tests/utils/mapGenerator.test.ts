import { MapGenerator } from "../../utils/mapGenerator";
import { defaultMapLevel } from "../../utils/mapData";

describe('MapGenerator Class', () => {
	const numberMaxWall: number = 7;
	const numberMaxGoal: number = 5;

	function toBeLessOrEqual(number1: number, number2: number) {
		if (number1 <= number2) return true;
		return false;
	}

	test('Generate Map with good numbers goal or wall', () => {
		const myMap = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);

		expect(toBeLessOrEqual(myMap.numberGoal, myMap.numberMaxGoal)).toBeTruthy();
		expect(toBeLessOrEqual(myMap.numberWall, myMap.numberMaxWall)).toBeTruthy();
	});

	test('Generate a map with the player starting position chosen within the map.', () => {
		const myMap = new MapGenerator(defaultMapLevel, numberMaxWall, numberMaxGoal);

		myMap.addPlayersMap(15);
		const maxPlayersPosition = myMap.level.filter((a) => a === 4);
		expect(maxPlayersPosition.length).toBeGreaterThan(2);

		myMap.onePlayerMap();
		const onePlayerMap = myMap.level.filter((a) => a === 4);
		expect(onePlayerMap.length).toEqual(1);
	});



});
