import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
	size?: number,
	className?: string
}

export const Logo: FC<Props> = ({ size = 26, className }) => {
	const dimension = Math.round(size * 1.8);

	return (
		<div className={clsx('flex select-none flex-col items-center whitespace-nowrap', className)}>
			<Image
				src='/images/logo.png'
				alt='Logo'
				width={dimension}
				height={dimension}
				priority
			/>
		</div>
	);
};
