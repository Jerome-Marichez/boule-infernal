

interface MusicLoopProps {
	music: "gameover" | "theme",
	mute: boolean,
}

/**
 * A component which return a <audio> with autoPlay & loop set to true
 * @param music The audio to be looped
 * @param mute If true audio is muted else audio is playing
 * @example 
 * <MusicLoop music={"gameover"} mute={gameOver ? false : true} />
 */
export default function MusicLoop({ music, mute }: MusicLoopProps): JSX.Element {

	return (
		<audio autoPlay={true} loop muted={mute} key={music}>
			<source src={require(`./${music}.mp3`)} type="audio/mp3" />
		</audio>
	)


}