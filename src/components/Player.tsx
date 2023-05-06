import "./Player.scss"

interface Player {
	topPosition: number;
	leftPosition: number;
	pixelSize: number;
}

export default function Player({ topPosition, leftPosition, pixelSize }: Player): JSX.Element {
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