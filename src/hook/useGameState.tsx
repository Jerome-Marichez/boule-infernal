import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../redux/store";
import { setGameOver, setMaxScore, setScore, setSpeed, setForceRender } from "../redux/gameSlice";


/**
 * @param block The type of block that was hit: "empty | green | wall | goal"
 * @param mapMove the map with pass & actual mouvement
 * @param numberGoal The number goal in the Level
 * @param speedVelocity The speed velocity increase each time a level is completed
 * @returns A hook that updates Score, GameOver, and Speed when (Level completed) using Redux as a dependency.
 */
export default function useGameState(block: "empty" | "green" | "wall" | "goal", moveMap: any, numberGoal: number, speedVelocity: number) {

	const dispatch = useDispatch();
	const score = useSelector((state: rootState) => state.gameState.score)
	const maxScore = useSelector((state: rootState) => state.gameState.maxScore)
	const gameOver = useSelector((state: rootState) => state.gameState.gameOver)
	const speed = useSelector((state: rootState) => state.gameState.speed)



	/** Force Render is a better way to trigger a new render of map */
	if (moveMap.includes(3) === false) dispatch(setForceRender(Math.random()))

	useEffect(() => {
		switch (block) {
			case "goal": dispatch(setScore(score + 1));
				break;
			case "wall": dispatch(setGameOver(true))
				break;
			default:
				if (score === numberGoal + maxScore) {
					dispatch(setMaxScore(maxScore + numberGoal))
					dispatch(setSpeed(speed - speedVelocity))
				}
				break;
		}
	}, [block])


	return [score, gameOver, maxScore, speed] as const;
}