import { useState } from "react";
import useKey from "@accessible/use-key"

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
export function MusicLoop({ music, mute }: MusicLoopProps): JSX.Element {

	const [interaction, setInteraction] = useState<boolean>(false);

	useKey(window, {
		ArrowUp: (event) => setInteraction(true),
		ArrowDown: (event) => setInteraction(true),
	})

	if (interaction) {
		return (
			<audio data-testid="audio" autoPlay={true} loop muted={mute} key={music}>
				<source data-testid="source" src={require(`./${music}.mp3`)} type="audio/mp3" />
			</audio>
		)
	}
	else {
		return (<></>);
	}

}