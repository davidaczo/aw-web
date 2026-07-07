import { format } from 'date-fns';
import * as Yup from 'yup';

import {
	nameError, notNameRegex, requiredError, timeError, timeRegex,
} from '../../utils';

export const getTimeStampInitialValues = (name: string) => ({
	[`${name}Date`]: '',
	[`${name}Time`]: '',
});

export const getTimestampIntervalInitialValues = (name: string) => ({
	...getTimeStampInitialValues(`${name}Start`),
	...getTimeStampInitialValues(`${name}End`),
});

export const getTimestampShape = (name: string) => ({
	[`${name}Date`]: Yup.date(),
	[`${name}Time`]: Yup.string().matches(timeRegex, timeError),
});

export const getTimestampIntervalShape = (name: string) => ({
	...getTimestampShape(`${name}Start`),
	...getTimestampShape(`${name}End`),
});

export const getTimestampErrors = (name: string, values: any) => {
	const errors: any = {};
	if (values[`${name}Date`] && !values[`${name}Time`]) {
		errors[`${name}Time`] = requiredError;
	}
	if (!values[`${name}Date`] && values[`${name}Time`]) {
		errors[`${name}Date`] = requiredError;
	}
	return errors;
};

export const getTimestampIntervalErrors = (name: string, values: any) => ({
	...getTimestampErrors(`${name}Start`, values),
	...getTimestampErrors(`${name}End`, values),
});

export const dateToFormDate = (date: string) => {
	if (date) {
		return format(new Date(date), 'yyyy-MM-dd');
	}
	return '';
};

export const dateToFormTime = (date: string) => {
	if (date) {
		return format(new Date(date), 'HH:mm');
	}
	return '';
};

export const nameSchema = Yup.string().trim().test(
	'name-schema',
	nameError,
	(value) => (!value ? true : !notNameRegex.test(value)),
).required(requiredError);
