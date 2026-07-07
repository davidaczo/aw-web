import toast, { ToastPosition } from 'react-hot-toast';

import { Toast, ToastType } from '../components/Toast';

type SpecificToastOptions = Omit<ToastOptions, 'type' | 'title'>;

export type ToastOptions = {
	title: string,
	type: ToastType,
	description?: string,
	duration?: number,
	position?: ToastPosition,
	toastId?: string,
}

export const createToast = ({
	title, type, description, duration, position = 'bottom-center', toastId,
}: ToastOptions) => {
	toast(({ id }) => (
		<Toast title={title} description={description} type={type} onClose={() => toast.dismiss(id)} />
	), { duration, position, id: toastId });
};

export const createSuccessToast = (title: string, options?: SpecificToastOptions) => {
	createToast({ title, type: 'success', ...options });
};

export const createErrorToast = (title: string, options?: SpecificToastOptions) => {
	createToast({ title, type: 'error', ...options });
};

export const createWarningToast = (title: string, options?: SpecificToastOptions) => {
	createToast({ title, type: 'warning', ...options });
};

export const createNotImplementedToast = () => {
	createWarningToast('Not implemented');
};
