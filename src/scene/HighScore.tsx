import "./HighScore.scss";
import { SupaBaseClient } from "../services/supabase";
import { useEffect, useState } from "react";
import Score from "../components/Score/Score";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import { ScoreObject, Scores } from "../sharedTypes/score";


export default function HighScore(): JSX.Element {

	// Retrieve My Score using Redux
	const myScore = useSelector((state: rootState) => state.gameState.score);

	// Get All Scores
	const [allHighScore, setAllHighScore] = useState<Scores>([]);

	const loadAllScores = async () => {
		const client = new SupaBaseClient();
		setAllHighScore(await client.readScore());
	}

	useEffect(() => { loadAllScores(); }, [])

	const topHighScores: Scores = [];
	const uniquePlayerScore: ScoreObject['name'][] = [];

	allHighScore
		.sort((a, b) => a.score - b.score)
		.reverse()
		.slice(0, 50)
		.forEach((score) => {
			if (!uniquePlayerScore.includes(score.name)) {
				uniquePlayerScore.push(score.name);
				topHighScores.push(score);
			}
		})


	// Recursive function generate "#"
	const hashTag = (numberHashTag: number) => (numberHashTag !== 0) ? "#" + hashTag(numberHashTag - 1) : "";

	// Return Element Hash Tag 
	const ElementHashTag = (hashTaglist: String) => {
		const p = hashTaglist.split("");
		return p.map((value: string, index: number) => {
			const isInteger = Number.isInteger(index / 2);

			if (isInteger) return <div key={index} className="color1">#</div>
			return <div key={index} className="color2">#</div>
		});
	}

	
	return (
		<div className="highscore">
			<div className="one_line">{ElementHashTag(hashTag(25))}</div>
			<div className="one_line"></div>
			<div className="one_line">
				<div className="group">
					{ElementHashTag(hashTag(3))}</div><div className="group">{ElementHashTag(hashTag(3))}
				</div>
			</div>
			<div className="one_line">
				<div className="group">
					{ElementHashTag(hashTag(3))}
				</div>
				<div className="group">
					{ElementHashTag(hashTag(3))}</div>
			</div>
			<div className="one_line">
				<div className="group">{ElementHashTag(hashTag(3))}</div>
				<Score name={"Name"} score={myScore} isItActualPlayer={true} key={topHighScores.length + 1} />
				<div className="group">{ElementHashTag(hashTag(3))}</div>
			</div>
			{topHighScores.slice(0, 15).map((value, index) => {
				return (
					<div className="one_line">
						<div className="group">{ElementHashTag(hashTag(3))}</div>
						<Score key={index} name={value.name.slice(0, 10)} score={value.score} isItActualPlayer={false} />
						<div className="group">{ElementHashTag(hashTag(3))}</div>
					</div>
				)
			})}
			<div className="one_line">
				<div className="group">
					{ElementHashTag(hashTag(3))}</div><div className="group">{ElementHashTag(hashTag(3))}
				</div>
			</div>
			<div className="one_line">
				<div className="group">
					{ElementHashTag(hashTag(3))}
				</div>
				<div className="group">
					{ElementHashTag(hashTag(3))}</div>
			</div>
			<div className="one_line">{ElementHashTag(hashTag(25))}</div>
		</div>
	);


}