import clsx from 'clsx';
import {
	CSSProperties, FC, PropsWithChildren, useCallback, useState,
} from 'react';

import { AccordionHeader } from './AccordionHeader';
import { Collapse } from './Collapse';

type CardProps = {
 title?: string,
 isOpenable?: boolean,
 initialOpen?: boolean,
	style?: CSSProperties,
 className?: string,
	onClick?: () => void,
}

export const Card: FC<PropsWithChildren<CardProps>> = ({
	children, title, isOpenable = false, initialOpen = false, style = {}, className, onClick,
}) => {
	const [isOpen, setOpen] = useState(initialOpen);

	const handleClick = useCallback(() => {
		if (onClick) {
			onClick();
		}
	}, [onClick]);

	return (
		<div
			className={clsx('modal-shadow rounded-[20px] bg-cardBg', !!onClick && 'cursor-pointer', className)}
			style={style}
			onClick={handleClick}
		>
			{!!title && <AccordionHeader title={title} isOpenable={isOpenable} isOpen={isOpen} onOpenChange={setOpen} />}
			{isOpenable ? (
				<Collapse isOpen={isOpen}>
					{children}
				</Collapse>
			) : <>{children}</>}
		</div>
	);
};
