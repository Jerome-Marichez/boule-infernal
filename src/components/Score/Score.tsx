
import "./Score.scss";
import { useState } from "react";
import useKey from "@accessible/use-key";
import { connectSupaBase, insertScore } from "../../data/supabase";


interface ScoreProps {
	name: string;
	score: number;
	isItActualPlayer: boolean;
}

/**
 * @returns A Component Score.
 * Submit the score by pressing "ENTER" if isItActualPlayer is set to true.
 * @param - The name associated with the score.
 * @param - The score.
 * @param - isItActualPlayer true if it's the actual player, false otherwise. If false, it returns a component score that cannot be modified or submit score
 */

export default function Score(props: ScoreProps): JSX.Element {

	const { score, isItActualPlayer } = props;
	const [name, setName] = useState<string>(props.name);
	const [keyEnter, setKeyEnter] = useState<boolean>(false);
	const [scoreSubmit, setScoreSubmit] = useState<boolean>(false);

	useKey(window, {
		Enter: () => setKeyEnter(true),
	})

	const registerScore = async () => {
		if (!scoreSubmit) {
			const connection: any = await connectSupaBase();
			await insertScore(connection, name, score);
			setScoreSubmit(true);
		}
	}

	if (keyEnter && isItActualPlayer) { registerScore(); }


	const displayInputScore = (isItActualPlayer: boolean) => {
		if (isItActualPlayer) {
			return (
				<input className={keyEnter ? 'name' : 'name animate'}
					onChange={(e) => setName(e.target.value)}
					defaultValue={name}
					maxLength={9}
					disabled={keyEnter ? true : false}
					autoFocus={true}
				/>
			)
		}
		else {
			return (
				<div className="name">{name}</div>
			)
		}
	}

	return (
		<div className="scores">
			<div className={isItActualPlayer ? 'player_score' : ''}>
				{displayInputScore(isItActualPlayer)}
			</div>
			<div className="score">{score}</div>
		</div >
	)
}