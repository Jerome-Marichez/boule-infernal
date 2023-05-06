import "./Block.scss";

interface Block {
	topPosition: number,
	leftPosition: number,
	pixelSize: number,
	type?: "empty" | "green" | "wall" | "goal"
}

/**
 * @param topPosition The top position of the block in absolute pixels on the game display.
 * @param leftPosition The left position of the block in absolute pixels on the game display.
 * @param pixelSize The pixel size of one block.
 * @param type  The type of block.
 * empty =  An empty block that does nothing.
 * green =  A green wall (the limit of the game) that bounces the player back if reached.
 * wall =  A wall that causes the game to be over if the player collides with it.
 * goal =  A goal object that the player needs to collect to complete the level, and that also bounces the player back.
 * @returns A block element displayed in the game.
 */

export function Block({ topPosition, leftPosition, pixelSize, type }: Block): JSX.Element {

	return (
		<div className={`block ${type}`} style={
			{
				height: `${pixelSize}px`,
				width: `${pixelSize}px`,
				top: `${topPosition}px`,
				left: `${leftPosition}px`,
			}}>

		</div>)
}