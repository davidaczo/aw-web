import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
	createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { usePreventScroll } from 'react-aria';
import { createPortal } from 'react-dom';

import type { DropdownConfig, DropdownInstance } from '../store/types';

interface DropdownsContextValue {
	host: HTMLElement | null;
	onOpenDropdown: (id: string, config?: Partial<DropdownConfig>) => void;
	onCloseDropdown: (id: string) => void;
	onRemoveDropdown: (id: string) => void;
	onCloseAllDropdowns: () => void;
	selectDropdown: (id: string) => DropdownInstance | undefined;
	isMobileView: boolean;
}

export const DropdownsContext = createContext<DropdownsContextValue>({
	host: null,
	onOpenDropdown: () => undefined,
	onCloseDropdown: () => undefined,
	onRemoveDropdown: () => undefined,
	onCloseAllDropdowns: () => undefined,
	selectDropdown: () => undefined,
	isMobileView: false,
});

export interface DropdownsContextProviderProps {
	children: ReactNode;
}

const defaultConfig: DropdownConfig = {
	closeable: true,
};

const openDropdown = (dropdowns: DropdownInstance[], id: string, config: DropdownConfig): DropdownInstance[] => {
	const isDropdownExist = dropdowns.some((dropdown) => dropdown.id === id);
	if (isDropdownExist) {
		return dropdowns;
	}

	const hasOpenDropdown = dropdowns.some((dropdown) => dropdown.state === 'open');

	const currentDropdowns: DropdownInstance[] = dropdowns
		.map((dropdown) => {
			if (dropdown.state === 'open') {
				return {
					...dropdown,
					state: 'background',
				};
			}

			return dropdown;
		});

	const newDropdown: DropdownInstance = {
		id,
		state: 'open',
		config,
		hasParent: hasOpenDropdown,
	};

	return [...currentDropdowns, newDropdown];
};

const closeFirstDropdown = (dropdowns: DropdownInstance[]): DropdownInstance[] => {
	const firstOpenDropdown = [...dropdowns].reverse().find((dropdown) => dropdown.state === 'open');
	if (!firstOpenDropdown) {
		return dropdowns;
	}
	return closeDropdown(dropdowns, firstOpenDropdown.id);
};

const closeDropdown = (dropdowns: DropdownInstance[], id: string): DropdownInstance[] => {
	const firstInBackgroundDropdown = [...dropdowns].reverse().find((dropdown) => dropdown.state === 'background');

	return dropdowns.map((dropdown) => {
		if (dropdown.id === id) {
			return {
				...dropdown,
				state: 'closing',
			};
		}

		if (dropdown.id === firstInBackgroundDropdown?.id) {
			return {
				...dropdown,
				state: 'open',
			};
		}

		return dropdown;
	});
};

const closeAllDropdowns = (dropdowns: DropdownInstance[], force = false): DropdownInstance[] => {
	const openedDropdown = dropdowns.find((dropdown) => dropdown.state === 'open');
	if (!force && (!openedDropdown || !openedDropdown.config.closeable)) {
		return dropdowns;
	}

	return dropdowns.map((dropdown) => ({
		...dropdown,
		state: ['open', 'background'].includes(dropdown.state) ? 'closing' : dropdown.state,
	}));
};

export const DropdownsContextProvider = ({ children }: DropdownsContextProviderProps) => {
	const router = useRouter();
	const [host] = useState(() => (typeof window === 'undefined' ? null : document.createElement('div')));
	const [dropdowns, setDropdowns] = useState<DropdownInstance[]>([]);
	const [isMobileView, setMobileView] = useState(false);

	useEffect(() => {
		if (host) {
			document.body.appendChild(host);

			return () => {
				document.body.removeChild(host);
			};
		}
		return () => {};
	}, [host]);

	const handleOpenDropdown = useCallback(
		(id: string, config?: Partial<DropdownConfig>) =>
			setDropdowns((currentDropdowns) => openDropdown(currentDropdowns, id, { ...defaultConfig, ...config })),
		[],
	);

	const handleCloseDropdown = useCallback((id: string) => setDropdowns((currentDropdowns) => closeDropdown(currentDropdowns, id)), []);

	const handleRemoveDropdown = useCallback((id: string) => setDropdowns((currentDropdowns) => currentDropdowns.filter((dropdown) => dropdown.id !== id)), []);

	const handleCloseAllDropdowns = useCallback((force = false) => setDropdowns((currentDropdowns) => closeAllDropdowns(currentDropdowns, force)), []);

	const handleCloseFirstDropdown = useCallback(() => setDropdowns((currentDropdowns) => closeFirstDropdown(currentDropdowns)), []);

	const handleBackdropClick = useCallback(() => {
		handleCloseFirstDropdown();
	}, [handleCloseFirstDropdown]);

	const handleForceCloseAllDropdowns = useCallback(() => {
		handleCloseAllDropdowns(true);
	}, [handleCloseAllDropdowns]);

	const selectDropdown = useCallback((id: string) => dropdowns.find((dropdown) => dropdown.id === id), [dropdowns]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCloseAllDropdowns();
			}
		};

		window.addEventListener('keyup', handler);

		return window.addEventListener('keyup', handler);
	}, [handleCloseAllDropdowns]);

	const hasOpenDropdowns = dropdowns.some((dropdown) => dropdown.state === 'open');

	usePreventScroll({ isDisabled: !hasOpenDropdowns });

	const value = useMemo<DropdownsContextValue>(
		() => ({
			host,
			onOpenDropdown: handleOpenDropdown,
			onCloseDropdown: handleCloseDropdown,
			onRemoveDropdown: handleRemoveDropdown,
			onCloseAllDropdowns: handleForceCloseAllDropdowns,
			selectDropdown,
			isMobileView,
		}),
		[host, handleOpenDropdown, handleCloseDropdown, handleRemoveDropdown, handleForceCloseAllDropdowns, selectDropdown, isMobileView],
	);

	useEffect(() => {
		const handleResize = () => {
			setMobileView(window.innerWidth <= 400);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const handleRouteChange = () => {
			setDropdowns([]);
		};
		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [dropdowns, router]);

	return (
		<DropdownsContext.Provider value={value}>
			{host
				&& createPortal(
					<AnimatePresence>
						{hasOpenDropdowns && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='fixed inset-0 z-30'
								onClick={handleBackdropClick}
							/>
						)}
					</AnimatePresence>,
					host,
				)}
			{children}
		</DropdownsContext.Provider>
	);
};
