import { useSelector } from "react-redux";
import "./PlayerScore.scss";
import { rootState } from "../../redux/store";
import {  useState } from "react";
import useKey from "@accessible/use-key";
import { connectSupaBase, insertScore } from "../../data/supabase";
/**
 * @returns A Component Player Score which display a input Player Name and a Score 
 * Submit score by press "ENTER"
 */
export default function PlayerScore(): JSX.Element {

	const [name, setName] = useState<string>('Name');
	const score = useSelector((state: rootState) => state.gameState.score);
	const [keyEnter, setKeyEnter] = useState<boolean>(false);
	const [scoreSubmit, setScoreSubmit] = useState<boolean>(false);

	useKey(window, {
		Enter: (event) => setKeyEnter(true),
	})

	const registerScore = async () => {
		if (!scoreSubmit) {
			const connection: any = await connectSupaBase();
			await insertScore(connection, name, score);
			setScoreSubmit(true);
		}
	}

	if (keyEnter) { registerScore(); }

	return (
		<div className='player_score'>
			<input className={keyEnter ? 'name' : 'name animate'}
				onChange={(e) => setName(e.target.value)}
				defaultValue={name}
				disabled={keyEnter ? true : false}
				autoFocus={true}
			/>
			<div className="score">{score}</div>
		</div>
	)
}