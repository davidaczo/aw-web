import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import { FC, useMemo, useRef } from 'react';

import ChevronDown from '../../../assets/icons/chevron-down';
import Close from '../../../assets/icons/close';

import { CommonInputFieldProps, InputBox } from './InputBox';

export type CustomSelectFieldProps = CommonInputFieldProps & {
	valueToShow: string;
 onClick?: () => void;
	onDelete?: () => void;
};

export const CustomSelectField: FC<CustomSelectFieldProps> = ({
	name,
	label,
	disabled,
	readOnly,
	className,
	valueToShow,
	onClick,
	onDelete,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const isError = touched && !!error;

	const handleClick = () => {
		if (!readOnly && onClick) {
			onClick();
		}
	};

	const handleRightIconClick = () => {
		if (!readOnly) {
			if (value) {
				if (onDelete) {
					onDelete();
				}
			} else {
				handleClick();
			}
		}
	};

	const Icon = useMemo(() => {
		if (readOnly) {
			return undefined;
		}
		if (value) {
			return Close;
		}
		return value ? Close : ChevronDown;
	}, [readOnly, value]);

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox
				rootRef={ref}
				name={name}
				value={valueToShow}
				type='text'
				readOnly
				RightIcon={Icon}
				onRightIconClick={handleRightIconClick}
				className={clsx(disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}
				inputClassName={clsx(disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}
				disabled={isSubmitting || disabled}
				isError={isError}
				onClick={handleClick}
			/>
			{touched && error && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
