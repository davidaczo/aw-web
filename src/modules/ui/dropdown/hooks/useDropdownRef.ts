import { useCallback, useMemo, useRef } from 'react';

import type { DropdownConfig, DropdownRef, IDropdown } from '../store/types';

export function useDropdownRef<Payload = unknown>(): DropdownRef<Payload> {
	const ref = useRef<IDropdown<Payload | null>>(null);

	const handleOpen = useCallback((payload?: Payload, config?: Partial<DropdownConfig>) => {
		if (!ref.current) {
			console.warn('ref is not set for the dropdown. Have you passed the ref prop to the dropdown component?');

			return;
		}

		ref.current.open(payload, config);
	}, []);

	const handleClose = useCallback(() => {
		if (!ref.current) {
			console.warn('ref is not set for the dropdown. Have you passed the ref prop to the dropdown component?');

			return;
		}

		ref.current?.close();
	}, []);

	return useMemo(
		() => ({
			ref,
			open: handleOpen,
			close: handleClose,
		}),
		[handleOpen, handleClose],
	);
}
