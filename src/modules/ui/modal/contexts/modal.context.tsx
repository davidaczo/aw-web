import { ReactNode, createContext } from 'react';

import type { ModalInstance } from '../store/types';

export const ModalContext = createContext<ModalInstance>({
	id: '',
	config: {
		closeable: true,
	},
	hasParent: false,
	state: 'open',
});

export interface ModalContextProviderProps {
	modal: ModalInstance;
	children: ReactNode;
}

export function ModalContextProvider({ modal, children }: ModalContextProviderProps) {
	return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
}
