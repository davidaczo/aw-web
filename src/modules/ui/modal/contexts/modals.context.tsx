import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
	createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { usePreventScroll } from 'react-aria';
import { createPortal } from 'react-dom';

import type { ModalConfig, ModalInstance } from '../store/types';

interface ModalsContextValue {
	host: HTMLElement | null;
	onOpenModal: (id: string, config?: Partial<ModalConfig>) => void;
	onCloseModal: (id: string) => void;
	onRemoveModal: (id: string) => void;
	onCloseAllModals: () => void;
	selectModal: (id: string) => ModalInstance | undefined;
	isMobileView: boolean;
}

export const ModalsContext = createContext<ModalsContextValue>({
	host: null,
	onOpenModal: () => undefined,
	onCloseModal: () => undefined,
	onRemoveModal: () => undefined,
	onCloseAllModals: () => undefined,
	selectModal: () => undefined,
	isMobileView: false,
});

export interface ModalsContextProviderProps {
	children: ReactNode;
}

const defaultConfig: ModalConfig = {
	closeable: true,
};

const openModal = (modals: ModalInstance[], id: string, config: ModalConfig): ModalInstance[] => {
	const isModalExist = modals.some((modal) => modal.id === id);
	if (isModalExist) {
		return modals;
	}

	const hasOpenModal = modals.some((modal) => modal.state === 'open');

	const currentModals: ModalInstance[] = modals
		.map((modal) => {
			if (modal.state === 'open') {
				return {
					...modal,
					state: 'background',
				};
			}

			return modal;
		});

	const newModal: ModalInstance = {
		id,
		state: 'open',
		config,
		hasParent: hasOpenModal,
	};

	return [...currentModals, newModal];
};

const closeFirstModal = (modals: ModalInstance[]): ModalInstance[] => {
	const firstOpenModal = [...modals].reverse().find((modal) => modal.state === 'open');
	if (!firstOpenModal) {
		return modals;
	}
	return closeModal(modals, firstOpenModal.id);
};

const closeModal = (modals: ModalInstance[], id: string): ModalInstance[] => {
	const firstInBackgroundModal = [...modals].reverse().find((modal) => modal.state === 'background');

	return modals.map((modal) => {
		if (modal.id === id) {
			return {
				...modal,
				state: 'closing',
			};
		}

		if (modal.id === firstInBackgroundModal?.id) {
			return {
				...modal,
				state: 'open',
			};
		}

		return modal;
	});
};

const closeAllModals = (modals: ModalInstance[], force = false): ModalInstance[] => {
	const openedModal = modals.find((modal) => modal.state === 'open');
	if (!force && (!openedModal || !openedModal.config.closeable)) {
		return modals;
	}

	return modals.map((modal) => ({
		...modal,
		state: ['open', 'background'].includes(modal.state) ? 'closing' : modal.state,
	}));
};

export const ModalsContextProvider = ({ children }: ModalsContextProviderProps) => {
	const router = useRouter();
	const [host] = useState(() => (typeof window === 'undefined' ? null : document.createElement('div')));
	const [modals, setModals] = useState<ModalInstance[]>([]);
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

	const handleOpenModal = useCallback(
		(id: string, config?: Partial<ModalConfig>) =>
			setModals((currentModals) => openModal(currentModals, id, { ...defaultConfig, ...config })),
		[],
	);

	const handleCloseModal = useCallback((id: string) => setModals((currentModals) => closeModal(currentModals, id)), []);

	const handleRemoveModal = useCallback((id: string) => setModals((currentModals) => currentModals.filter((modal) => modal.id !== id)), []);

	const handleCloseAllModals = useCallback((force = false) => setModals((currentModals) => closeAllModals(currentModals, force)), []);

	const handleCloseFirstModal = useCallback(() => setModals((currentModals) => closeFirstModal(currentModals)), []);

	const handleBackdropClick = useCallback(() => {
		handleCloseFirstModal();
	}, [handleCloseFirstModal]);

	const handleForceCloseAllModals = useCallback(() => {
		handleCloseAllModals(true);
	}, [handleCloseAllModals]);

	const selectModal = useCallback((id: string) => modals.find((modal) => modal.id === id), [modals]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCloseAllModals();
			}
		};

		window.addEventListener('keyup', handler);

		return window.addEventListener('keyup', handler);
	}, [handleCloseAllModals]);

	const hasOpenModals = modals.some((modal) => modal.state === 'open');

	usePreventScroll({ isDisabled: !hasOpenModals });

	const value = useMemo<ModalsContextValue>(
		() => ({
			host,
			onOpenModal: handleOpenModal,
			onCloseModal: handleCloseModal,
			onRemoveModal: handleRemoveModal,
			onCloseAllModals: handleForceCloseAllModals,
			selectModal,
			isMobileView,
		}),
		[host, handleOpenModal, handleCloseModal, handleRemoveModal, handleForceCloseAllModals, selectModal, isMobileView],
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
			setModals([]);
		};
		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [modals, router]);

	return (
		<ModalsContext.Provider value={value}>
			{host
				&& createPortal(
					<AnimatePresence>
						{hasOpenModals && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='fixed inset-0 z-10 bg-black/60'
								onClick={handleBackdropClick}
							/>
						)}
					</AnimatePresence>,
					host,
				)}
			{children}
		</ModalsContext.Provider>
	);
};
