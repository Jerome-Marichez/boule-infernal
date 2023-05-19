import "./Player.scss"
import useKey from '@accessible/use-key'
import { useEffect } from "react";


interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyPressed: any;
	blockHit: any
}

/**
 * @param topPosition The top position of the block in absolute pixels on the game display.
 * @param leftPosition The left position of the block in absolute pixels on the game display.
 * @param pixelSize The pixel size of one block.
 * @param setKeyPressed A callback function to update a state with value "Up | Down"
 * @param blockHit A block collision if any "empty" | "green" | "wall" | "goal"
 * @returns A player component displayed in the game.
 */
export function Player({ topPosition, leftPosition, pixelSize, setKeyPressed, blockHit }: Player): JSX.Element {

	useKey(window, {
		ArrowUp: (event) => setKeyPressed("Up"),
		ArrowDown: (event) => setKeyPressed("Down"),
	})

	useEffect(() => {
		if (blockHit === "goal" || blockHit === "wall") {
			const sound = blockHit === "goal" ? require("./goal.wav") : require("./gameover.wav");
			const audio = new Audio(sound);
			audio.play();
		}
	}, [blockHit])

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