import {
	createContext, useState, PropsWithChildren, useMemo,
} from 'react';

interface NavigationContextValue {
 isNavigationLocked: boolean,
 onNavigationLockedChange: (v: boolean) => void,
}

export const NavigationContext = createContext<NavigationContextValue>({
	isNavigationLocked: false,
	onNavigationLockedChange: () => {},
});

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
	const [isNavigationLocked, setNavigationLocked] = useState(false);

	const value = useMemo<NavigationContextValue>(() => ({
		isNavigationLocked, onNavigationLockedChange: setNavigationLocked,
	}), [isNavigationLocked, setNavigationLocked]);

	return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};
