import { useEffect, useState } from "react";
/**
 * 
 * @param block The block hit by the player 
 * @return [score, gameOver] where 
 * 
 * score = A state with the score as a number
 * 
 * gameOver = A state with a gameOver boolean set to True if gameOver
 */
export default function useBlockhit(block: "empty" | "green" | "wall" | "goal") {

	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		if (block === "goal") {
			setScore(score + 10);
		}
		if (block === "wall") {
			setGameOver(true);
		}
	}, [block])

	return [score, gameOver] as const;

}