import clsx from 'clsx';
import React from 'react';

import { ActivityIndicator } from '../../../ui/components/activity-indicator/ActivityIndicator';

type LoginButtonProps = {
	onClick?: () => Promise<void> | void;
    icon?: React.ReactNode;
    children: React.ReactNode;
    variant?: 'white' | 'dark';
    className?: string;
    contentClassName?: string;
    style?: React.CSSProperties;
};

export function LoginButton({
	onClick,
	icon,
	children,
	variant = 'white',
	className,
	contentClassName,
	style,
}: LoginButtonProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	return (
		<button
			type='button'
			onClick={async () => {
				if (!onClick) return;
				try {
					setIsLoading(true);
					await onClick();
				} finally {
					setIsLoading(false);
				}
			}}
			className={clsx(
				'flex h-[36px] w-full max-w-[300px] items-center justify-center gap-2 rounded-full py-[15px] text-[12px] font-medium shadow-md transition',
				variant === 'white'
					? 'bg-white text-black'
					: 'bg-black font-semibold text-white',
				className,
			)}
			style={style}
		>
			<div className={clsx('flex w-full items-center gap-2 px-2 ', icon ? 'justify-between' : 'justify-center', contentClassName)}>
				{icon && <span className='ml-3 flex size-6 items-center justify-center'>{icon}</span>}
				{isLoading ? (
					<ActivityIndicator size='xs' color='black' />)
					: (children)}

				{icon && <div className='size-6' />}
			</div>
		</button>
	);
}
