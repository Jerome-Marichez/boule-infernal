import "./Player.scss"
import useKey from '@accessible/use-key'

interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
	setKeyboardPressed: (key: string) => void;
}

export default function Player({ topPosition, leftPosition, pixelSize, setKeyboardPressed }: Player): JSX.Element {

	useKey(window, {
		ArrowUp: (event) => setKeyboardPressed("Up"),
		ArrowDown: (event) => setKeyboardPressed("Down"),
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