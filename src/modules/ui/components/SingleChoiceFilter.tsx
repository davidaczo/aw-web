import clsx from 'clsx';
import { FC, useRef } from 'react';

import ChevronDown from '../../../assets/icons/chevron-down';
import { useDropdownRef } from '../dropdown/hooks/useDropdownRef';

import { SingleChoiceMenu } from './single-choice-menu/SingleChoiceMenu';

export type SingleChoiceFilterOption = {
 id: string,
 label: string,
}

type SingleChoiceFilterProps = {
 label: string,
 value: string,
 options: SingleChoiceFilterOption[],
 onChange: (v: string) => void,
 readonly?: boolean,
};

export const SingleChoiceFilter: FC<SingleChoiceFilterProps> = ({
	label, value, options, onChange, readonly = false,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const menu = useDropdownRef();

	const handleChange = (id: string) => {
		onChange(id);
		menu.close();
	};

	const handleClick = () => {
		if (!readonly) {
			menu.open();
		}
	};

	return (
		<>
			<div
				className={clsx(
					'flex items-center gap-1',
					readonly ? 'cursor-default' : 'cursor-pointer')}
				ref={ref}
				onClick={handleClick}
			>
				<div className='body-normal-medium'>{label}</div>
				{!readonly && (
					<ChevronDown className='size-6 shrink-0' />
				)}
			</div>
			{!readonly && (
				<SingleChoiceMenu ref={menu.ref} anchorRef={ref} value={value} items={options} onChange={handleChange} />
			)}
		</>
	);
};
