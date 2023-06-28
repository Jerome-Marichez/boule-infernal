import "./Player.scss"
import useKey from '@accessible/use-key'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";


interface PlayerProps {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyPressed: (value: "Up" | "Down" | "") => void;
	sound: "goal" | "wall" | "empty" | "green"
}

/**
 * @param topPosition The top position of the block in absolute pixels on the game display.
 * @param leftPosition The left position of the block in absolute pixels on the game display.
 * @param pixelSize The pixel size of one block.
 * @param setKeyPressed A callback function to update a state with value "Up | Down"
 * @param sound  A .wav to be play if available in this folder component
 * @returns A player component displayed in the game.
 */
export function Player(props: PlayerProps): JSX.Element {

	const { topPosition, leftPosition, pixelSize, setKeyPressed, sound } = props;
	const mute = useSelector((state: rootState) => state.gameState.mute)

	useKey(window, {
		ArrowUp: (event) => setKeyPressed("Up"),
		ArrowDown: (event) => setKeyPressed("Down"),
	})

	useEffect(() => {
		if (mute) return;

		try {
			const audio = new Audio(require(`./${sound}.wav`));
			audio.play();
		}
		catch (e) {

		}
	}, [sound, mute])


	return (
		<div className="player" role="img" style={
			{
				height: `${pixelSize}px`,
				width: `${pixelSize}px`,
				top: `${topPosition}px`,
				left: `${leftPosition}px`,
			}}>
		</div>
	)
}