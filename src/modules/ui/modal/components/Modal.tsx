import clsx from 'clsx';
import { FormikContextType } from 'formik';
import {
	ReactNode, useContext, MouseEvent, CSSProperties,
} from 'react';

import Close from '../../../../assets/icons/close';
import { Button } from '../../components/Button';
import { ModalContext } from '../contexts/modal.context';
import { ModalsContext } from '../contexts/modals.context';

import { FormWrapper } from './FormWrapper';
import styles from './Modal.module.scss';

type ModalProps = {
	children?: ReactNode;
	formik?: FormikContextType<any>;
	className?: string;
	width?: string;
	borderRadius?: string;
};

type ModalHeaderProps = {
	children?: ReactNode;
	className?: string;
} & { closable?: boolean; onClose?: () => void };

type ModalContentProps = {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
};

type ModalActionsProps = {
	children?: ReactNode;
	className?: string;
};

export const Modal = ({
	children, formik, className, width = '400px', borderRadius = '40px',
}: ModalProps) => {
	const { isMobileView } = useContext(ModalsContext);
	const { state } = useContext(ModalContext);

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div
			className={clsx('modal-shadow relative z-50 max-h-[90vh] overflow-hidden rounded-t-[var(--border-radius)] transition-all duration-[0.3s]',
				isMobileView
					? 'w-full max-w-full self-end rounded-b-none'
					: 'w-[var(--width)] max-w-[calc(100%-48px)] rounded-b-[var(--border-radius)]',
				state === 'background' ? 'pointer-events-none brightness-75' : 'pointer-events-auto',
				styles.modalRoot,
			)}
			style={{ '--width': width, '--border-radius': borderRadius } as never}
			onClick={handleClick}
		>
			{formik ? (
				<FormWrapper formik={formik}>
					<div className={clsx('relative flex max-h-[90vh] flex-col gap-0 bg-cardBg', className)}>{children}</div>
				</FormWrapper>
			) : (
				<div className={clsx('relative flex max-h-[90vh] flex-col gap-0 bg-cardBg', className)}>{children}</div>
			)}
		</div>
	);
};

Modal.Header = ({
	children, closable = true, onClose, className,
}: ModalHeaderProps) => (
	<div className={clsx('flex items-center justify-between gap-x-2 p-6', className)}>
		<div className='title-h4 break-smart line-clamp-2 pb-1'>{children}</div>
		{closable && (
			<Button size='sm' variant='text' className='shrink-0' LeftIcon={Close} onClick={onClose} />
		)}
	</div>
);

Modal.Content = ({ children, className, style }: ModalContentProps) => <div className={clsx('relative overflow-y-auto px-6 py-1', className)} style={style}>{children}</div>;

Modal.Actions = ({ children, className }: ModalActionsProps) => <div className={clsx('grid grid-flow-col gap-4 p-6', className)}>{children}</div>;
