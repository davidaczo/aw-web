import { useField, useFormikContext } from 'formik';
import type { FC } from 'react';

import { Checkbox, CheckboxProps } from '../../ui/components/checkbox/Checkbox';

import { CommonInputFieldProps, InputBox } from './InputBox';

type CheckboxFieldProps = CommonInputFieldProps & {
	labelSize?: CheckboxProps['labelSize']
};

export const CheckboxField: FC<CheckboxFieldProps> = ({
	name, label, disabled, className, labelSize,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { touched, error } = meta;
	const isError = touched && !!error;

	return (
		<div className={className}>
			<Checkbox
				{...field}
				label={label}
				checked={field.value}
				isError={isError}
				disabled={disabled || isSubmitting}
				labelSize={labelSize}
			/>
			{isError && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
