import clsx from 'clsx';
import {
	ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType, RefObject, SVGProps,
} from 'react';

import { ActivityIndicator } from './activity-indicator/ActivityIndicator';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyleVariant = 'primary' | 'text' | 'destructive' | 'destructiveFilled';

export interface ButtonProps<C extends ElementType> extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	variant?: ButtonStyleVariant;
	disabled?: boolean;
	LeftIcon?: ElementType<SVGProps<SVGSVGElement>>
	RightIcon?: ElementType<SVGProps<SVGSVGElement>>;
	component?: C;
	isLoading?: boolean;
	rootRef?: RefObject<any>;
}

const sizeClassNames: Record<ButtonSize, string> = {
	sm: clsx('min-h-[32px] text-tiny'),
	md: clsx('min-h-[40px] text-normal'),
	lg: clsx('min-h-[48px] text-normal'),
};

const styleVariantClassNames: Record<ButtonStyleVariant, string> = {
	primary: clsx('bg-primary text-text2 hover:btn-hovered focus:btn-hovered enabled:hover:btn-hovered disabled:cursor-not-allowed disabled:bg-gray70 disabled:hover:shadow-none'),
	text: clsx('text-primary0 disabled:text-gray50 dark:text-primary50'),
	destructive: clsx('text-state-error-60 disabled:text-gray50'),
	destructiveFilled: clsx('bg-state-error-60 text-white disabled:bg-gray50 disabled:text-black'),
};

const buttonSpacingVariants: Record<ButtonSize, string> = {
	sm: clsx('px-4 py-1'),
	md: clsx('px-4 py-2'),
	lg: clsx('px-4 py-3'),
};

const iconSpacingVariants: Record<ButtonSize, string> = {
	sm: clsx('p-1'),
	md: clsx('p-2'),
	lg: clsx('p-3'),
};

const iconSizeVariants: Record<ButtonSize, string> = {
	sm: clsx('size-3 shrink-0'),
	md: clsx('size-4 shrink-0'),
	lg: clsx('size-6 shrink-0'),
};

export const Button = <C extends ElementType = 'button'>({
	size = 'lg',
	variant = 'primary',
	className,
	type = 'button',
	component,
	isLoading,
	children,
	LeftIcon,
	RightIcon,
	onClick,
	rootRef,
	...props
}: ButtonProps<C> & ComponentPropsWithoutRef<C>) => {
	const Component = component ?? 'button';

	const handleClick = (e: any) => {
		if (isLoading) {
			e.preventDefault();
		} else if (onClick) {
			onClick(e);
		}
	};

	const isIcon = !children && (!!LeftIcon || !!RightIcon);
	const iconClassName = clsx(isIcon ? 'size-6' : iconSizeVariants[size]);

	return (
		<Component
			ref={rootRef}
			type={type}
			className={clsx(
				'relative',
				'flex items-center justify-center gap-2',
				'overflow-hidden font-medium',
				'transition-all duration-[0.2s]',
				'rounded-full',
				'outline-none [-webkit-tap-highlight-color:transparent]',
				'focus:[&:not(:focus-visible)]:shadow-none',
				!!isLoading && 'cursor-not-allowed',
				sizeClassNames[size],
				styleVariantClassNames[variant],
				isIcon ? iconSpacingVariants[size] : buttonSpacingVariants[size],
				isIcon && 'aspect-square',
				className,
			)}
			onClick={handleClick}
			{...props}
		>
			{isLoading && (
				<div className='absolute inset-0 grid place-items-center bg-inherit'>
					<ActivityIndicator size='sm' />
				</div>
			)}
			<>
				{LeftIcon && <LeftIcon className={iconClassName} />}
				{children}
				{RightIcon && <RightIcon className={iconClassName} />}
			</>
		</Component>
	);
};
