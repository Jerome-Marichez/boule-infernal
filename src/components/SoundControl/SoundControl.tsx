import "./SoundControl.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMute } from "../../redux/gameSlice";
import { rootState } from "../../redux/store";


/**
 * @return A Sound Control component that displays whether the sound is muted or not and updates the sound in the Redux store.
 */
export function SoundControl(): JSX.Element {

	const dispatch = useDispatch();
	const mute = useSelector((state: rootState) => state.gameState.mute)

	return (
		<div onClick={() => dispatch(setMute(!mute))} className="sound_control">
			Sound {mute ? "Off 🔇" : "On 🔊"}
		</div>
	);
	
}