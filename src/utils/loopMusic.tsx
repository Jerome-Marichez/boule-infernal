
/**
 * A function which allow to loop a music
 * @param music The audio to be looped.
 * @example 
 * const music = new Audio(require("theme.wav"));
 * loopMusic(music)
 */
export function loopMusic(music: HTMLAudioElement) {

	const audio = () => {
		try {
			music.addEventListener('ended', function () {
				music.currentTime = 0;
				music.play();
			}, false);
			music.play();
		}
		catch (e) {

		}
	}

	audio();
	
}