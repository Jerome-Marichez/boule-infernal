import "./ScoreControl.scss";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";


/**
 * @return A Score Control component that displays the actual score.
 */
export function ScoreControl(): JSX.Element {
	const score = useSelector((state: rootState) => state.gameState.score)
	return (<div className="score_control">Score: {score} 🏅</div>);
}