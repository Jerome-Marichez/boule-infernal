import "./Block.scss";

interface Block {
	topPosition: number,
	leftPosition: number,
	pixelSize: number,
	empty?: boolean
}

/**
 * 
 * @param topPosition
 * @param leftPosition
 * @param pixelSize 
 * @param empty  
 * @returns 
 */
export function Block({ topPosition, leftPosition, pixelSize, empty }: Block): JSX.Element {

	return (<div className={empty ? "block empty" : "block green"} style={
		{
			height: `${pixelSize}px`,
			width: `${pixelSize}px`,
			top: `${topPosition}px`,
			left: `${leftPosition}px`,
		}}></div>)
}