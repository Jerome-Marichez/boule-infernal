import "./Player.scss"
import useKey from '@accessible/use-key'
import { useEffect } from "react";


interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyPressed: any;
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
export function Player({ topPosition, leftPosition, pixelSize, setKeyPressed, sound }: Player): JSX.Element {

	useKey(window, {
		ArrowUp: (event) => setKeyPressed("Up"),
		ArrowDown: (event) => setKeyPressed("Down"),
	})

	useEffect(() => {
		try {
			const audio = new Audio(require(`./${sound}.wav`));
			audio.play();
		}
		catch (e) {

		}
	}, [sound])


	return (
		<div className="player" style={
			{
				height: `${pixelSize}px`,
				width: `${pixelSize}px`,
				top: `${topPosition}px`,
				left: `${leftPosition}px`,
			}}>
		</div>
	)
}