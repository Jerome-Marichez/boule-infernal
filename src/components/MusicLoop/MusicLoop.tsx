
/**
 * A function which allow to loop a music
 * @param music The audio to be looped.
 * @example 
 * const music = new Audio(require("theme.wav"));
 * loopMusic(music)
 */
export default function MusicLoop({ music, mute }: { music: any, mute: boolean }) : JSX.Element {

	return (
		<audio autoPlay={true} loop muted={mute} key={music}>
			<source src={require(`./${music}.mp3`)} type="audio/mp3" />
		</audio>
	)


}