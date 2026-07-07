import type { ReactNode, MutableRefObject } from 'react';

export type DropdownState = 'open' | 'closing' | 'background';

export interface DropdownConfig {
	closeable: boolean;
}

export interface IDropdown<Payload> {
	open(payload?: Payload, config?: Partial<DropdownConfig>): void;
	close(): void;
}

export interface DropdownInstance {
	id: string;
	state: DropdownState;
	config: DropdownConfig;
	hasParent: boolean;
}

export interface DropdownProps<Payload> {
	payload: Payload;
	hasParent: boolean;
	onClose(): void;
}

export interface DropdownRef<Payload> extends Pick<IDropdown<Payload>, 'open' | 'close'> {
	ref: MutableRefObject<IDropdown<Payload> | null>;
}

export interface DropdownTemplateProps {
	children: ReactNode;
	className?: string;
}
