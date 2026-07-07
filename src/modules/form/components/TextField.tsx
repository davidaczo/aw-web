import { useField, useFormikContext } from 'formik';
import type { FC } from 'react';

import { CommonInputFieldProps, InputBox } from './InputBox';

type TextFieldProps = CommonInputFieldProps & {
	type: string,
	multiline?: boolean,
	rows?: number,
}

export const TextField: FC<TextFieldProps> = ({
	name, type, label, disabled, readOnly, multiline = false, rows, className,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { touched, error } = meta;
	const isError = touched && !!error;

	return (
		<div className={className}>
			{!!label && <InputBox.Label text={label} />}
			<InputBox {...field} type={type} disabled={isSubmitting || disabled} multiline={multiline} rows={rows} isError={isError} readOnly={readOnly} />
			{isError && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
