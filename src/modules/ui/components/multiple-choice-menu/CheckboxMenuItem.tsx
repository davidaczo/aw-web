import clsx from 'clsx';
import type { ChangeEvent, FC, MouseEvent } from 'react';

import { Checkbox } from '../checkbox/Checkbox';

type CheckboxMenuItemProps = {
 label: string,
 checked: boolean,
 onChange: (v: boolean) => void,
 className?: string,
}

export const CheckboxMenuItem: FC<CheckboxMenuItemProps> = ({
	label, checked, onChange, className,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	const handleClick = () => {
		onChange(!checked);
	};

	const handleCheckboxClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={clsx('flex items-center gap-2 px-3 py-2 hover:bg-hover1', className)} onClick={handleClick}>
			<Checkbox checked={checked} onChange={handleChange} onClick={handleCheckboxClick} />
			<div>{label}</div>
		</div>
	);
};
