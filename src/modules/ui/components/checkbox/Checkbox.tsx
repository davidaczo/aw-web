import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef, ChangeEvent } from 'react';

import styles from './checkbox.module.scss';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean,
	isError?: boolean,
	hint?: string;
	labelSize?: 'sm' | 'md';
	className?: string;
	label?: string;
	labelPosition?: 'left' | 'right';
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({
		checked, onChange, disabled = false, isError = false, label, labelSize = 'sm', className, ...props
	}, ref) => (
		<div className='flex items-center gap-3'>
			<input
				{...props}
				ref={ref}
				type='checkbox'
				className={clsx(
					'relative appearance-none checked:bg-primary30 dark:checked:bg-primary0',
					'after:absolute after:inset-0',
					'size-6 rounded-[8px] border-[1.5px]',
					'shrink-0',
					disabled && 'cursor-not-allowed border-gray60 checked:bg-gray60',
					disabled ? 'cursor-not-allowed' : 'cursor-pointer',
					isError ? 'border-state-error-60' : 'border-primary30 dark:border-primary0',
					styles.input,
				)}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			{!!label && (
				<div className={clsx('break-smart', labelSize === 'sm' ? 'body-small-regular' : 'body-normal-regular')}>
					{label}
				</div>
			)}
		</div>
	),
);
