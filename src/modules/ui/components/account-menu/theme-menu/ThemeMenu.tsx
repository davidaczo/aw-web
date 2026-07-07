import type { RefObject } from 'react';

import { Theme, useTheme } from '../../../../../providers/theme.context';
import { Dropdown } from '../../../dropdown/components/Dropdown';
import { createDropdown } from '../../../dropdown/store/actions';

import { ThemeMenuItem } from './ThemeMenuItem';

const items: Array<{ id: Theme, label: string }> = [
	{ id: 'system', label: 'System' },
	{ id: 'light', label: 'Light' },
	{ id: 'dark', label: 'Dark' },
];

type ThemeMenuProps = {
 anchorRef: RefObject<any>,
	onClose: () => void
}

export const ThemeMenu = createDropdown<ThemeMenuProps>(({ anchorRef, onClose }) => {
	const { theme, onThemeChange } = useTheme();
	const handleChange = (t: Theme) => () => {
		onThemeChange(t);
		onClose();
	};

	return (
		<Dropdown
			anchorRef={anchorRef}
			minWidth={280}
			maxWidth={300}
			className='modal-shadow max-h-[calc(75vh-32px)] rounded-[16px] bg-cardBg'
		>
			<div className='p-2'>
				{items.map(({ id, label }) => (
					<ThemeMenuItem key={id} label={label} onClick={handleChange(id)} isActive={id === theme} />
				))}
			</div>
		</Dropdown>
	);
});
