import {
	createContext, PropsWithChildren, useCallback, useContext, useMemo, useState,
} from 'react';

interface HeaderContextValue {
 isOpen: boolean,
 onOpenChange: (isOpen: boolean) => void,
}

export const HeaderContext = createContext<HeaderContextValue>({
	isOpen: false,
	onOpenChange: () => undefined,
});

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setOpen] = useState(false);

	const handleOpenChange = useCallback((value: boolean) => {
		setOpen(value);
	}, []);

	const value = useMemo<HeaderContextValue>(
		() => ({
			isOpen,
			onOpenChange: handleOpenChange,
		}),
		[isOpen, handleOpenChange],
	);
	return (
		<HeaderContext.Provider value={value}>
			{children}
		</HeaderContext.Provider>
	);
};

export const useHeader = () => useContext(HeaderContext);
