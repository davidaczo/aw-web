import type { FC, MouseEvent } from 'react';

import type { SelectOption } from '../../../form/components/SelectField';

type SelectMenuItemProps = {
 data: SelectOption,
 onClick: (e: MouseEvent) => void,
};

export const SelectMenuItem: FC<SelectMenuItemProps> = ({ data, onClick }) => (
	<div className='relative flex h-[50px] w-full cursor-pointer select-none items-center overflow-hidden px-3 hover:bg-hover1' onClick={onClick}>
		<div className='body-normal-regular break-smart line-clamp-2 py-px'>
			{data.label}
		</div>
	</div>
);
