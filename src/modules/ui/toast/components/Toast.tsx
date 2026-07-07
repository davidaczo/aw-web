import clsx from 'clsx';
import type { ElementType, SVGProps } from 'react';

import Close from '../../../../assets/icons/close';
import { ToastError, ToastSuccess, ToastWarning } from '../../../../assets/icons/toast';

export type ToastType = 'success' | 'error' | 'warning';

type Props = {
	title: string;
	description?: string;
	type: ToastType;
	className?: string;
	onClose: () => void;
};

export const Toast = ({
	title, description, type, onClose, className,
}: Props) => {
	const iconMap: Record<ToastType, ElementType<SVGProps<SVGSVGElement>>> = {
		success: ToastSuccess,
		error: ToastError,
		warning: ToastWarning,
	};

	const colorMap: Record<ToastType, string> = {
		success: clsx('bg-toast-success'),
		error: clsx('bg-state-error-60'),
		warning: clsx('bg-toast-warning'),
	};

	const Icon = iconMap[type];

	return (
		<div className={clsx('flex w-[355px] items-start gap-3 rounded-2xl px-2 py-4', colorMap[type], className)}>
			<Icon className='size-6 shrink-0 text-white' />
			<div className='mt-1 flex grow flex-col gap-2'>
				<span className='body-small-medium text-white'>{title}</span>
				{!!description && <span className='body-tiny-regular'>{description}</span>}
			</div>
			<button aria-label='Close toast' type='button' className='shrink-0 text-white' onClick={onClose}>
				<Close className='size-6' />
			</button>
		</div>
	);
};
