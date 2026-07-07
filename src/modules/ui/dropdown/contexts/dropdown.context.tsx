import { ReactNode, createContext } from 'react';

import type { DropdownInstance } from '../store/types';

export const DropdownContext = createContext<DropdownInstance>({
	id: '',
	config: {
		closeable: true,
	},
	hasParent: false,
	state: 'open',
});

export interface DropdownContextProviderProps {
	dropdown: DropdownInstance;
	children: ReactNode;
}

export function DropdownContextProvider({ dropdown, children }: DropdownContextProviderProps) {
	return <DropdownContext.Provider value={dropdown}>{children}</DropdownContext.Provider>;
}
