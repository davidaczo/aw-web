import clsx from 'clsx';
import {
	FC, forwardRef, PropsWithRef, MouseEvent, useMemo, CSSProperties,
} from 'react';

import { px } from '../../../utils';
import type { UserDetailedDto } from '../../user/store/types';

type AvatarProps = {
 user: UserDetailedDto,
 size?: number,
	onClick?: () => void
	ref?: any,
	style?: CSSProperties,
}

export const Avatar: FC<PropsWithRef<AvatarProps>> = forwardRef<HTMLDivElement, AvatarProps>(({
	user, size = 32, onClick, style = {},
}, ref) => {
	const handleClick = (e: MouseEvent) => {
		if (onClick) {
			e.stopPropagation();
			onClick();
		}
	};

	const textSize = useMemo(() => size * 0.46, [size]);
	const text = useMemo(() => {
		if (!user.name) {
			return '';
		}
		const parts = user.name.split(' ').filter((item) => !!item);
		let s = '';
		if (parts[0]) {
			s = parts[0][0].toUpperCase();
		}
		if (parts[1]) {
			s = `${s}${parts[1][0].toUpperCase()}`;
		}
		return s;
	}, [user]);
	return (
		<div
			className={clsx(
				'flex aspect-square shrink-0 items-center justify-center rounded-[50%] bg-primary20 dark:bg-primary20',
				onClick ? 'cursor-pointer' : 'cursor-default',
			)}
			style={{ ...style, width: px(size) }}
			onClick={handleClick}
			ref={ref}
		>
			<div className='font-medium text-text2' style={{ fontSize: px(textSize), lineHeight: px(textSize) }}>
				{text}
			</div>
		</div>
	);
});
