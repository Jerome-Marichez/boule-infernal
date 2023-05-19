import "./Player.scss"
import useKey from '@accessible/use-key'

interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyPressed: any;
}

/**
 * @param topPosition The top position of the block in absolute pixels on the game display.
 * @param leftPosition The left position of the block in absolute pixels on the game display.
 * @param pixelSize The pixel size of one block.
 * @param setKeyPressed A callback function to update a state with value "Up | Down"
 * @returns A player component displayed in the game.
 */
export default function Player({ topPosition, leftPosition, pixelSize, setKeyPressed }: Player): JSX.Element {

	useKey(window, {
		ArrowUp: (event) => setKeyPressed("Up"),
		ArrowDown: (event) => setKeyPressed("Down"),
	})

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