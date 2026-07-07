import clsx from 'clsx';
import type { FC } from 'react';

import ChevronDown from '../../../assets/icons/chevron-down';

type AccordionHeaderProps = {
 title: string,
	isOpenable?: boolean,
 isOpen?: boolean,
 onOpenChange?: (value: boolean) => void,
}

export const AccordionHeader: FC<AccordionHeaderProps> = ({
	title, isOpenable = false, isOpen, onOpenChange,
}) => {
	const handleClick = () => {
		if (isOpenable && isOpen !== undefined && onOpenChange) {
			onOpenChange(!isOpen);
		}
	};

	return (
		<div className={clsx('flex select-none items-center gap-x-1 px-4 py-3', isOpenable ? 'cursor-pointer' : 'cursor-default')} onClick={handleClick}>
			{isOpenable && <ChevronDown className={clsx('size-6 transition-all duration-200', isOpen ? 'rotate-180' : 'rotate-0')} />}
			<div className='body-large-bold rounded-t-[20px]'>
				{title}
			</div>
		</div>
	);
};
