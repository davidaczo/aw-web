import { ReactNode, MutableRefObject } from 'react';

export type ModalState = 'open' | 'closing' | 'background';

export interface ModalConfig {
	closeable: boolean;
}

export interface IModal<Payload> {
	open(payload?: Payload, config?: Partial<ModalConfig>): void;
	close(): void;
}

export interface ModalInstance {
	id: string;
	state: ModalState;
	config: ModalConfig;
	hasParent: boolean;
}

export interface ModalProps<Payload> {
	payload: Payload;
	hasParent: boolean;
	onClose(): void;
	isNavigationLocked: boolean;
}

export interface ModalRef<Payload> extends Pick<IModal<Payload>, 'open' | 'close'> {
	ref: MutableRefObject<IModal<Payload> | null>;
}

export interface ModalTemplateProps {
	children: ReactNode;
	className?: string;
}
