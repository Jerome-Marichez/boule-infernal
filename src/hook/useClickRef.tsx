import { useEffect, useState } from "react";

/**
 * Hook that detects mouse clicks and determines whether the mouse's Y position is above or below the reference element.
 * @param elementRef A reference element through useRef React.
 * @returns aboveY, belowY as booleans.
 * @example
 * // Usage example
 * const ref = useRef<HTMLDivElement>(null);
 * const [aboveY, belowY] = useClickRef(ref);
 */

export default function useClickRef(elementRef: React.RefObject<any>) {
	const [aboveY, setAboveY] = useState<boolean>(false);
	const [belowY, setBelowY] = useState<boolean>(false);

	const handleClickControl = (event: MouseEvent) => {
		if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
			const elementRefY = elementRef.current.getBoundingClientRect().y;

			if (elementRefY > event.y) {
				setAboveY(true);
			} else {
				setBelowY(true);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickControl);

		return () => {
			document.removeEventListener('click', handleClickControl);
		};
	},)


	return [aboveY, belowY] as const;
}