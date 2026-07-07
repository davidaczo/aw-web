import type { RefObject } from 'react';

import { Dropdown } from '../../dropdown/components/Dropdown';
import { createDropdown } from '../../dropdown/store/actions';
import type { SingleChoiceFilterOption } from '../SingleChoiceFilter';

import { MenuItem } from './MenuItem';

type SingleChoiceMenuProps = {
 anchorRef: RefObject<any>,
 value: string,
 items: Array<SingleChoiceFilterOption>,
 onChange: (id: string) => void,
}

export const SingleChoiceMenu = createDropdown<SingleChoiceMenuProps>(({
	anchorRef, value, items, onChange,
}) => {
	const handleChange = (id: string) => () => {
		onChange(id);
	};

	return (
		<Dropdown anchorRef={anchorRef} maxWidth={200} minWidth={150} className='modal-shadow max-h-[calc(75vh-32px)] rounded-[16px] bg-cardBg'>
			<div className='p-2'>
				{items.map(({ id, label }) => (
					<MenuItem
						key={id}
						label={label}
						isActive={value === id}
						onChange={handleChange(id)}
					/>
				))}
			</div>
		</Dropdown>
	);
});
