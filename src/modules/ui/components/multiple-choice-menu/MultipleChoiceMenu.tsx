import type { RefObject } from 'react';

import { Dropdown } from '../../dropdown/components/Dropdown';
import { createDropdown } from '../../dropdown/store/actions';
import type { MultipleChoiceFilterOption } from '../MultipleChoiceFilter';

import { CheckboxMenuItem } from './CheckboxMenuItem';

type MultipleChoiceMenuProps = {
 anchorRef: RefObject<any>,
	value: string[],
 items: Array<MultipleChoiceFilterOption>,
	onChange: (id: string, value: boolean) => void,
}

export const MultipleChoiceMenu = createDropdown<MultipleChoiceMenuProps>(({
	anchorRef, value, items, onChange,
}) => (
	<Dropdown anchorRef={anchorRef} maxWidth={null} minWidth={150} className='modal-shadow max-h-[calc(75vh-32px)] rounded-[16px] bg-cardBg'>
		{items.map(({ id, label }) => (
			<CheckboxMenuItem
				key={id}
				label={label}
				checked={value.includes(id)}
				onChange={(v) => {
					onChange(id, v);
				}}
			/>
		))}
	</Dropdown>
));
