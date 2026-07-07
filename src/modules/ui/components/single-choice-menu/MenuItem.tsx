import clsx from 'clsx';
import type { FC } from 'react';

type MenuItemProps = {
 label: string,
 isActive: boolean,
 onChange: () => void,
 className?: string,
}

export const MenuItem: FC<MenuItemProps> = ({
	label, isActive, onChange, className,
}) => {
	const handleClick = () => {
		if (!isActive) {
			onChange();
		}
	};

	return (
		<div className={clsx('flex items-center gap-2 rounded-[16px] px-3 py-2 hover:bg-hover1', className)} onClick={handleClick}>
			<div>{label}</div>
		</div>
	);
};
