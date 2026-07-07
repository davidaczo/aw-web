import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import type { FC } from 'react';

import type { CommonInputFieldProps } from '../InputBox';

import styles from './RangeField.module.scss';

type TextFieldProps = CommonInputFieldProps & {
 min: number,
 max: number,
 step?: number,
}

export const RangeField: FC<TextFieldProps> = ({
	name, label, disabled, min, max, step = 1, className,
}) => {
	const { isSubmitting } = useFormikContext();
	const [field] = useField(name);

	return (
		<div className={className}>
			{!!label && (
				<div className={clsx('body-normal-medium break-smart pb-2')}>
					{`${label}: `}
					<span className='font-bold'>{field.value}</span>
				</div>
			)}
			<input
				{...field}
				type='range'
				disabled={isSubmitting || disabled}
				min={min}
				max={max}
				step={step}
				className={styles.input}
			/>
		</div>
	);
};
