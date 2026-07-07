import { useCallback, useMemo, useRef } from 'react';

import type { IModal, ModalConfig, ModalRef } from '../store/types';

export function useModalRef<Payload = unknown>(): ModalRef<Payload> {
	const ref = useRef<IModal<Payload | null>>(null);

	const handleOpen = useCallback((payload?: Payload, config?: Partial<ModalConfig>) => {
		if (!ref.current) {
			console.warn('ref is not set for the modal. Have you passed the ref prop to the modal component?');

			return;
		}

		ref.current.open(payload, config);
	}, []);

	const handleClose = useCallback(() => {
		if (!ref.current) {
			console.warn('ref is not set for the modal. Have you passed the ref prop to the modal component?');

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
