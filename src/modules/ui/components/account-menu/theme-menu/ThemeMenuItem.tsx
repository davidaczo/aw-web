import clsx from 'clsx';
import type { FC } from 'react';

type ThemeMenuItemProps = {
 label: string,
	isActive?: boolean,
 onClick?: () => void,
 className?: string,
};

export const ThemeMenuItem: FC<ThemeMenuItemProps> = ({
	label, isActive = false, onClick, className,
}) => {
	const handleClick = () => {
		if (!isActive && onClick) {
			onClick();
		}
	};

	return (
		<div
			className={clsx('flex items-center gap-x-2 rounded-[16px] px-2 py-3 hover:bg-hover1', className)}
			onClick={handleClick}
		>
			<div className={clsx(isActive ? 'body-normal-bold text-primary' : 'body-normal-medium')}>{label}</div>
		</div>
	);
};
