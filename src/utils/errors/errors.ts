import { apiErrors } from './api-errors';

export const requiredError = 'This field is required';

export const getTypeError = (type: string) => `Enter a valid ${type}`;
export const dateError = getTypeError('date');
export const emailError = getTypeError('email address');
export const phoneError = getTypeError('phone number');
export const numberError = getTypeError('number');
export const timeError = getTypeError('time');
export const nameError = 'Value must not contain # or emoji';

export const notNameRegex = /[#\p{Emoji}]/u;

export const minLenError = (n: number): string => `Insert at least ${n} characters`;
export const maxLenError = (n: number): string => `Insert ${n} characters at more`;

export const minValError = (n: number): string => `Min: ${n}`;
export const maxValError = (n: number): string => `Max: ${n}`;

export const getErrorText = ({ code }: { code: string }, message = 'Hiba') => (apiErrors[code] ? apiErrors[code] : `${message}: ${code}`);
