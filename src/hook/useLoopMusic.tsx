import { useEffect, useState } from "react";

/**
 * looping music when a movement is detected.
 * @param waitInput A dependency useEffect(() => {}) used to wait for a change before playing the audio (if it hasn't been played yet).
 * @param music The audio to be looped.
 * @param audioLength The length of the audio in milliseconds.
 * @return play True if music played false if music not played
 */
export default function useLoopMusic(waitInput: string, music: any, audioLength: number) {

	const [play, setPlay] = useState(false);
	useEffect(() => {
		if (waitInput) {
			if (!play) {
				setTimeout(() => {
					setPlay(false);
				}, audioLength)
				music.play();
				setPlay(true);
			}
		}
	}, [waitInput])

	return [play] as const
}