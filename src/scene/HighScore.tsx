import "./HighScore.scss";
import { connectSupaBase, readScore } from "../data/supabase";
import { useEffect, useState } from "react";
import PlayerScore from "../components/PlayerScore/PlayerScore";

interface scoreObject {
	score: number
	name: string
}

export default function HighScore(): JSX.Element {

	const [allHighScore, setAllHighScore] = useState<Array<scoreObject>>([]);

	const loadScore = async () => {
		const connection: any = await connectSupaBase();
		const readScores: any = await readScore(connection);
		setAllHighScore(readScores);
	}

	useEffect(() => {
		loadScore();
	}, [])

	const topHighScore = allHighScore.sort((a, b) => a.score - b.score).reverse().slice(0, 15);

	// Recursive function generate "#"
	const hashTag: any = (numberHashTag: number) => {
		if (numberHashTag !== 0) {
			return "#" + hashTag(numberHashTag - 1);
		}
		return "";
	}

	// Return Element Hash Tag 
	const ElementHashTag = (hashTaglist: String) => {
		const p = hashTaglist.split("");
		return p.map((value: any, index: number) => {
			const isInteger = Number.isInteger(index / 2);
			if (isInteger) {
				return <div key={index} className="color1">#</div>
			}
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
				<div className="scores"><PlayerScore /></div>
				<div className="group">{ElementHashTag(hashTag(3))}</div>
			</div>
			{topHighScore.map((value) => {
				return (
					<div className="one_line">
						<div className="group">{ElementHashTag(hashTag(3))}</div>
						<div className="scores"><div className="name">{value.name}</div> <div className="score">{value.score}</div></div>
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