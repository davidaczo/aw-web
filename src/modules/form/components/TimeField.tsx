import { useField, useFormikContext } from 'formik';
import type { FC } from 'react';

import Clock from '../../../assets/icons/clock';

import { CommonInputFieldProps, InputBox } from './InputBox';

type TimeFieldProps = CommonInputFieldProps;

export const TimeField: FC<TimeFieldProps> = ({
	name, label, disabled, className,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { touched, error } = meta;
	const isError = touched && !!error;

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox {...field} type='text' mask='99:99' RightIcon={Clock} disabled={isSubmitting || disabled} isError={isError} />
			{touched && error && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
