import { useField, useFormikContext } from 'formik';
import { FC, useState } from 'react';

import Eye from '../../../assets/icons/eye';
import EyeOff from '../../../assets/icons/eye-off';

import { CommonInputFieldProps, InputBox } from './InputBox';

type PasswordFieldProps = CommonInputFieldProps

export const PasswordField: FC<PasswordFieldProps> = ({
	name, label, disabled, className,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { touched, error } = meta;
	const isError = touched && !!error;

	const [isPasswordVisible, setPasswordVisible] = useState(false);

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox
				{...field}
				type={isPasswordVisible ? 'text' : 'password'}
				RightIcon={isPasswordVisible ? EyeOff : Eye}
				onRightIconClick={() => setPasswordVisible((state) => !state)}
				disabled={isSubmitting || disabled}
				isError={isError}
			/>
			{isError && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
