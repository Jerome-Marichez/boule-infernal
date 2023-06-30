import { useEffect, useState } from "react";

/**
 * Hook that detects mouse clicks and determines whether the mouse's X or Y position is above or below the reference element.
 * @param elementRef A reference element through useRef React.
 * @returns aboveX, aboveY, belowX, belowY as booleans.
 * @example
 * // Usage example
 * const ref = useRef<HTMLDivElement>(null);
 * const [aboveX, aboveY, belowX, belowY] = useClickRef(ref);
 */

export default function useClickRef(elementRef: React.RefObject<any>) {
	const [aboveX, setAboveX] = useState<boolean>(false);
	const [aboveY, setAboveY] = useState<boolean>(false);
	const [belowX, setBelowX] = useState<boolean>(false);
	const [belowY, setBelowY] = useState<boolean>(false);

	const handleClickControl = (event: MouseEvent) => {
		if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
			const elementRefY = elementRef.current.getBoundingClientRect().y;
			const elementRefX = elementRef.current.getBoundingClientRect().x;

			if (elementRefY > event.y) {
				setAboveY(true);
				setBelowY(false);
			} else {
				setAboveY(false);
				setBelowY(true);
			}

			if (elementRefX > event.x) {
				setAboveX(true);
				setBelowX(false);
			}
			else {
				setAboveX(false);
				setBelowX(true);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickControl);

		return () => {
			document.removeEventListener('click', handleClickControl);
		};
	},)


	return [aboveX, aboveY, belowX, belowY] as const;
}