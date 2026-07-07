import { FC } from 'react';

import { DateField } from './date-field/DateField';
import { TimeField } from './TimeField';

type TimeStampFieldProps = {
 name: string,
 label?: string,
 className?: string,
}

export const TimeStampField: FC<TimeStampFieldProps> = ({ name, label, className }) => (
	<div className={className}>
		{!!label && <div className='body-normal-medium'>{label}</div>}
		<div className='grid grid-cols-[auto_100px] gap-x-4 gap-y-5 max-[320px]:grid-cols-1'>
			<DateField name={`${name}Date`} />
			<TimeField name={`${name}Time`} />
		</div>
	</div>
);
