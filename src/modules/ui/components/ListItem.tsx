import clsx from 'clsx';
import React, {
	CSSProperties, FC, MouseEvent, PropsWithChildren,
} from 'react';

import { px } from '../../../utils';

type ListItemProps = {
 isTop?: boolean;
 isBottom?: boolean;
 borderRadius?: number;
 onClick?: ((e: MouseEvent) => void);
	className?: string,
 style?: CSSProperties;
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
	children,
	isTop = false,
	isBottom = false,
	borderRadius = 25,
	onClick,
	className,
	style = {},
}) => {
	const br = px(borderRadius);
	const rootStyle = {
		...(isTop && {
			borderTopLeftRadius: br,
			borderTopRightRadius: br,
		}),
		...(isBottom && {
			borderBottomLeftRadius: br,
			borderBottomRightRadius: br,
		}),
		...style,
	};

	return (
		<div
			className={clsx('overflow-hidden bg-cardBg px-4 hover:bg-hover1', onClick ? 'cursor-pointer' :  'cursor-default', className)}
			style={rootStyle}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
