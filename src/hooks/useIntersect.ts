import { useEffect, useRef, useState } from 'react';

type IntersectHandler = (() => void) | null;
type UseIntersectFn = (options: IntersectionObserverInit, onIntersect: IntersectHandler, onNonIntersect?: IntersectHandler) => [any];

export const useIntersect: UseIntersectFn = (options, onIntersect, onNonIntersect = null) => {
	const [node, setNode] = useState(null);

	const observer = useRef<any>(null);

	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}
		observer.current = new IntersectionObserver(([v]) => {
			if (onNonIntersect && !v.isIntersecting) {
				onNonIntersect();
			}
			if (onIntersect && v.isIntersecting) {
				onIntersect();
			}
		}, options);
		const { current: currentObserver } = observer;
		if (node) {
			currentObserver.observe(node);
		}

		return () => {
			currentObserver.disconnect();
		};
	}, [node, options, onIntersect, onNonIntersect]);

	return [setNode];
};
