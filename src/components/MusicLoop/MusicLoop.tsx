import { useState, useRef, useEffect } from "react";
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
	const audioRef = useRef<HTMLAudioElement>(null);
	
	useEffect(() => {
		document.addEventListener('click', () => setInteraction(true));

		return () => {
			document.removeEventListener('click', () => setInteraction(true));
		};
	},)

	useKey(window, {
		ArrowUp: () => setInteraction(true),
		ArrowDown: () => setInteraction(true),
	})

	if (interaction) {
		return (
			<audio ref={audioRef} data-testid="audio" autoPlay loop muted={mute} key={music}>
				<source data-testid="source" src={require(`./${music}.mp3`)} type="audio/mp3" />
			</audio>
		)
	}
	else {
		return (<div data-testid="empty" />);
	}

}