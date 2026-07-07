import { AnimatePresence } from 'framer-motion';
import {
	ComponentType, forwardRef, useCallback, useContext, useId, useImperativeHandle, useState,
} from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';

import { DropdownContextProvider } from '../contexts/dropdown.context';
import { DropdownsContext } from '../contexts/dropdowns.context';

import type {
	IDropdown, DropdownProps,
} from './types';

export function createDropdown<Props = void, Payload = void>(
	Component: ComponentType<Props & DropdownProps<Payload>>,
) {
	return forwardRef<IDropdown<Payload>, Props>((props, ref) => {
		const {
			host, onOpenDropdown, onCloseDropdown, selectDropdown, onRemoveDropdown,
		} = useContext(DropdownsContext);
		const id = useId();
		const [payload, setPayload] = useState<null | Payload>(null);

		useImperativeHandle(
			ref,
			() => ({
				open: (p, config) => {
					setPayload(p ?? null);
					onOpenDropdown(id, config);
				},
				close: () => onCloseDropdown(id),
			}),
			[id, onOpenDropdown, onCloseDropdown],
		);

		const handleClose = useCallback(() => {
			onCloseDropdown(id);
		}, [onCloseDropdown, id]);

		const dropdown = selectDropdown(id);

		const handleExitComplete = useCallback(() => {
			onRemoveDropdown(id);
		}, [id, onRemoveDropdown]);

		if (!dropdown) {
			return null;
		}

		const isOpen = dropdown.state !== 'closing';

		return (
			host
			&& createPortal(
				<FocusLock returnFocus disabled={!isOpen}>
					<DropdownContextProvider dropdown={dropdown}>
						<AnimatePresence onExitComplete={handleExitComplete}>
							{isOpen && (
								<div className='pointer-events-none fixed inset-0 z-[200] h-full max-h-screen'>
									<Component
										{...props}
										payload={payload!}
										onClose={handleClose}
										hasParent={dropdown.hasParent}
									/>
								</div>
							)}
						</AnimatePresence>
					</DropdownContextProvider>
				</FocusLock>,
				host,
			)
		);
	});
}
