import {
	createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { usePreventScroll } from 'react-aria';
import { createPortal } from 'react-dom';

interface SidebarContextValue {
 host: HTMLElement | null;
 isOpen: boolean;
 openSidebar: () => void;
 closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
	host: null,
	isOpen: false,
	openSidebar: () => undefined,
	closeSidebar: () => undefined,
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isOpen, setOpen] = useState(false);
	const [host] = useState(() => (typeof window === 'undefined' ? null : document.createElement('div')));

	useEffect(() => {
		if (host) {
			document.body.appendChild(host);

			return () => {
				document.body.removeChild(host);
			};
		}
		return () => {};
	}, [host]);

	usePreventScroll({ isDisabled: !isOpen });

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const value = useMemo<SidebarContextValue>(
		() => ({
			host,
			isOpen,
			openSidebar: handleOpen,
			closeSidebar: handleClose,
		}),
		[host, isOpen, handleOpen, handleClose],
	);

	return (
		<SidebarContext.Provider value={value}>
			{!!host && createPortal(children, host)}
		</SidebarContext.Provider>
	);
};
