import "./Player.scss"
import useKey from '@accessible/use-key'

interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyPressed: any;
}

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