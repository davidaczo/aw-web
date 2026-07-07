import clsx from 'clsx';
import { FC, useRef } from 'react';

import ChevronDown from '../../../assets/icons/chevron-down';
import { useDropdownRef } from '../dropdown/hooks/useDropdownRef';

import { MultipleChoiceMenu } from './multiple-choice-menu/MultipleChoiceMenu';

export type MultipleChoiceFilterOption = {
 id: string,
 label: string,
}

type MultipleChoiceFilterProps = {
 label: string,
 options: MultipleChoiceFilterOption[],
 value: string[],
 onChange: (v: string[]) => void,
	disabled?: boolean,
};

export const MultipleChoiceFilter: FC<MultipleChoiceFilterProps> = ({
	label, options, value, onChange, disabled = false,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const menu = useDropdownRef();

	const handleChange =  (id: string, v: boolean) => {
		const tmp = [...value];
		onChange(v ? [...tmp, id] : tmp.filter((item) => item !== id));
	};

	const handleClick = () => {
		if (!disabled) {
			menu.open();
		}
	};

	return (
		<>
			<div
				className={clsx('flex items-center gap-0.5', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}
				ref={ref}
				onClick={handleClick}
			>
				<div className='body-normal-medium'>{label}</div>
				{!!value.length && (
					<div
						className='body-tiny-bold flex size-[18px] items-center justify-center rounded-[50%] bg-primary tracking-[-0.5px] text-white'
					>
						{value.length}
					</div>
				)}
				<ChevronDown className='size-6 shrink-0' />
			</div>
			<MultipleChoiceMenu ref={menu.ref} anchorRef={ref} value={value} items={options} onChange={handleChange} />
		</>
	);
};
