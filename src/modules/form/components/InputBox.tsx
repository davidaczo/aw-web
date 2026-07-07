import clsx from 'clsx';
import throttle from 'lodash.throttle';
import {
	ElementType, InputHTMLAttributes, RefObject, SVGProps, useEffect, useCallback, useRef,
} from 'react';
import InputMask from 'react-input-mask';

export type CommonInputFieldProps = {
	name: string,
	label?: string,
	disabled?: boolean,
	readOnly?: boolean,
	className?: string,
}

type InputBoxProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
	rootRef?: RefObject<HTMLDivElement>,
	inputRef?: RefObject<HTMLInputElement>,
	className?: string,
	inputClassName?: string,
	style?: object,
	inputStyle?: object,
	isError?: boolean,
	mask?: string,
	multiline?: boolean,
	rows?: number,
	LeftIcon?: ElementType<SVGProps<SVGSVGElement>>,
	RightIcon?: ElementType<SVGProps<SVGSVGElement>>,
	onLeftIconClick?: () => void,
	onRightIconClick?: () => void,
}

type LabelProps = {
	text?: string,
	className?: string,
};

type ErrorProps = {
	text?: string,
	className?: string,
}

const renderIcon = (Icon: ElementType<SVGProps<SVGSVGElement>>, disabled: boolean, onClick?: () => void) => (
	<Icon className={clsx('size-5 shrink-0', disabled ? 'cursor-not-allowed' : !!onClick && 'cursor-pointer')} onClick={disabled ? () => {} : onClick} />
);

const getRootClassName = (disabled: boolean, isError: boolean) => {
	if (disabled) {
		return clsx('cursor-not-allowed border-gray80 text-gray50');
	}
	if (isError) {
		return clsx('border-state-error-60 text-text1 focus-within:border-primary');
	}
	return clsx('border-gray70 text-text1 focus-within:border-primary');
};

export const InputBox = ({
	rootRef,
	inputRef,
	className,
	inputClassName,
	style,
	inputStyle,
	isError = false,
	disabled = false,
	readOnly = false,
	mask,
	multiline = false,
	rows = 4,
	LeftIcon,
	RightIcon,
	onLeftIconClick,
	onRightIconClick,
	...props
}: InputBoxProps) => {
	const textAreRef = useRef<HTMLTextAreaElement>(null);
	const inputClasses = clsx('w-full flex-1 border-none bg-transparent outline-none', disabled && 'cursor-not-allowed', inputClassName);

	const handleInput = useCallback(() => {
		const { current } = textAreRef;
		if (current) {
			current.style.height = 'auto';
			current.style.height = `${current.scrollHeight}px`;
		}
	}, []);

	useEffect(() => {
		if (multiline) {
			const handleResizeTh = throttle(handleInput, 200);
			window.addEventListener('resize', handleResizeTh);
			return () => {
				window.removeEventListener('resize', handleResizeTh);
			};
		}
		return () => {};
	}, [multiline, handleInput]);

	return (
		<div
			className={clsx(
				'flex items-center gap-x-1 rounded-[8px] border-[1px] border-solid px-2 py-1',
				getRootClassName(disabled, isError),
				className)}
			style={style}
			ref={rootRef}
		>
			{!!LeftIcon && renderIcon(LeftIcon, disabled, onLeftIconClick)}
			{mask ? (
				<InputMask
					{...props}
					mask={mask}
					disabled={disabled}
					readOnly={readOnly}
					className={inputClasses}
					style={inputStyle}
				/>
			) : (
				<>
					{!multiline ? (
						<input
							{...props}
							ref={inputRef}
							disabled={disabled}
							readOnly={readOnly}
							className={inputClasses}
							style={inputStyle}
						/>
					) : (
						<textarea
							{...props}
							ref={textAreRef}
							onInput={handleInput}
							disabled={disabled}
							readOnly={readOnly}
							className={inputClasses}
							style={{ ...inputStyle, resize: 'none' }}
							rows={rows}
						/>
					)}
				</>
			)}
			{!!RightIcon && renderIcon(RightIcon, disabled, onRightIconClick)}
		</div>
	);
};

InputBox.Label = ({ text, className }: LabelProps) => (
	<div className={clsx('body-normal-medium line-clamp-1 break-all pb-1', className)}>{text || ''}</div>
);

InputBox.Error = ({ text, className }: ErrorProps) => (
	<div
		className={clsx('body-tiny-medium mt-1 whitespace-pre-wrap text-state-error-60', className)}
		dangerouslySetInnerHTML={{ __html: text || '' }}
	/>
);
