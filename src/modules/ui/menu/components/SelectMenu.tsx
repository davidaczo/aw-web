import type { RefObject, MouseEvent } from 'react';

import { useContext, useEffect } from 'react';

import type { SelectOption } from '../../../form/components/SelectField';
import { Dropdown } from '../../dropdown/components/Dropdown';
import { DropdownContext } from '../../dropdown/contexts/dropdown.context';
import { createDropdown } from '../../dropdown/store/actions';

import { SelectMenuItem } from './SelectMenuItem';

type SelectMenuProps = {
 anchorRef: RefObject<any>,
 menuItems: Array<SelectOption>,
	onSelect: (id: string) => void,
	onAfterClose: () => void,
}

export const SelectMenu = createDropdown<SelectMenuProps>(({
	anchorRef, menuItems, onSelect, onAfterClose,
}) => {
	const { state } = useContext(DropdownContext);

	useEffect(() => {
		if (state !== 'open') {
			onAfterClose();
		}
	}, [state, onAfterClose]);

	const handleItemClick = (id: string) => (e: MouseEvent) => {
		e.stopPropagation();
		onSelect(id);
	};

	return (
		<Dropdown anchorRef={anchorRef} isAnchorWidth maxWidth={null} className='modal-shadow max-h-[calc(75vh-32px)] rounded-[16px] bg-cardBg2'>
			{menuItems.map((item) => (
				<SelectMenuItem key={item.id} data={item} onClick={handleItemClick(item.id)} />
			))}
		</Dropdown>
	);
});
