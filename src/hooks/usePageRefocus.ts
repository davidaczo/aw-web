import { useEffect } from 'react';

export const usePageRefocus = (onPageRefocus: () => void) => {
	useEffect(() => {
		const handleVisibilityChange = async () => {
			if (document.visibilityState === 'visible') {
				onPageRefocus();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [onPageRefocus]);
};
