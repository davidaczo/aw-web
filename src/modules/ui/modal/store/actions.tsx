import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import {
	ComponentType, forwardRef, useCallback, useContext, useId, useImperativeHandle, useState,
} from 'react';
import { createPortal } from 'react-dom';

import { NavigationContext } from '../../../../navigation/contexts/navigation.context';
import { ModalContextProvider } from '../contexts/modal.context';
import { ModalsContext } from '../contexts/modals.context';

import type {
	IModal, ModalProps,
} from './types';

export function createModal<Props = void, Payload = void>(
	Component: ComponentType<Props & ModalProps<Payload>>,
) {
	return forwardRef<IModal<Payload>, Props>((props, ref) => {
		const {
			host, onOpenModal, onCloseModal, selectModal, onRemoveModal,
		} = useContext(ModalsContext);
		const { isNavigationLocked } = useContext(NavigationContext);

		const id = useId();
		const [payload, setPayload] = useState<null | Payload>(null);

		useImperativeHandle(
			ref,
			() => ({
				open: (p, config) => {
					setPayload(p ?? null);
					onOpenModal(id, config);
				},
				close: () => onCloseModal(id),
			}),
			[id, onOpenModal, onCloseModal],
		);

		const handleClose = useCallback(() => {
			onCloseModal(id);
		}, [onCloseModal, id]);

		const modal = selectModal(id);

		const handleExitComplete = useCallback(() => {
			onRemoveModal(id);
		}, [id, onRemoveModal]);

		if (!modal) {
			return null;
		}

		const handleBackdropClick = () => {
			// if (isNavigationLocked) {
			// eslint-disable-next-line no-alert
			// if (confirm('Are you sure you want to exit? The unsaved data will loss.')) {
			// 	handleClose();
			// }
			// }
		};

		const isOpen = modal.state !== 'closing';

		return (
			host
			&& createPortal(
				// <FocusLock returnFocus disabled={!isOpen}>
				<ModalContextProvider modal={modal}>
					<AnimatePresence onExitComplete={handleExitComplete}>
						{isOpen && (
							<div
								className={clsx(
									'pointer-events-none fixed inset-0 z-20 flex h-full max-h-screen items-center justify-center',
									isNavigationLocked ? 'pointer-events-auto' : 'pointer-events-none',
								)}
								onClick={handleBackdropClick}
							>
								<Component
									{...props}
									payload={payload!}
									onClose={handleClose}
									isNavigationLocked={isNavigationLocked}
									hasParent={modal.hasParent}
								/>
							</div>
						)}
					</AnimatePresence>
				</ModalContextProvider>,
				// </FocusLo/ck>,
				host,
			)
		);
	});
}
