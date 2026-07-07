import { useField, useFormikContext } from 'formik';
import type { ChangeEvent, FC } from 'react';

import { CommonInputFieldProps, InputBox } from './InputBox';

type NumberFieldProps = CommonInputFieldProps & {
	type: 'int' | 'decimal',
	decimals?: number | null,
}

export const NumberField: FC<NumberFieldProps> = ({
	name, type, decimals = null, label, disabled, className,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field, meta] = useField(name);
	const { onChange } = field;
	const { touched, error } = meta;
	const isError = touched && !!error;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const event = e;
		const v = e.target.value;
		if (!v) {
			onChange(e);
			return;
		}
		if (type === 'int' || decimals === 0) {
			const starts = ['+', '-'];
			if (starts.includes(v) || v.match(/^[+-]?\d+$/)) {
				event.target.value = v;
				onChange(event);
			}
		} else  {
			const reg = /^[+-]?((\d+[.,]?\d*)|([.,]\d+))$/;
			const starts = ['.', ',', '+', '-'];
			if (starts.includes(v) || v.match(reg)) {
				if (decimals !== null) {
					if (v.split('.')[1]?.length > decimals) {
						return;
					}
				}
				onChange(v.replace(',', '.').trim());
				event.target.value = v.replace(',', '.').trim();
				onChange(event);
			}
		}
	};

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox {...field} onChange={handleChange} type='text' inputMode='decimal' disabled={isSubmitting || disabled} isError={isError} />
			{isError && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
