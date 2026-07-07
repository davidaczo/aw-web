import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import type { FC } from 'react';

import { useTheme } from '../../../../providers/theme.context';
import { CommonInputFieldProps, InputBox } from '../InputBox';

import styles from './DateField.module.scss';

type DateFieldProps = CommonInputFieldProps

export const DateField: FC<DateFieldProps> = ({
	name, label, disabled, className,
}) => {
	const { isDark } = useTheme();

	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { touched, error } = meta;
	const isError = touched && !!error;

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox
				{...field}
				type='date'
				disabled={isSubmitting || disabled}
				isError={isError}
				inputClassName={clsx(isDark && styles.input)}
			/>
			{isError && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
