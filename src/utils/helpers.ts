import nookies from 'nookies';
import { v4 as uuidv4 } from 'uuid';

import packageJson from '../../package.json';

export const px = (v: string | number) => `${v}px`;

export const phoneRegex = /^\+*([0-9]+ *){10,16}$/;
export const timeRegex = /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/;

export const isServer = typeof window === 'undefined';
export type AppType = 'DEV' | 'UAT' | 'PROD';

export const getAppVersion = (): string => packageJson.version;
export const getApiHost = () => (isServer ? process.env.SSR_API_HOST : process.env.NEXT_PUBLIC_API_HOST);
export const getAppType = (): AppType => {
	const app = process.env.NEXT_PUBLIC_APP;
	return !app || !['DEV', 'UAT', 'PROD'].includes(app) ? 'DEV' : app as AppType;
}; export const getFrontendHost = () => process.env.NEXT_PUBLIC_FRONTEND_HOST;
export const getIsAppWithFirebase = () => process.env.NEXT_PUBLIC_WITH_FIREBASE === 'true';
export const getFirebaseConfig = () => ({
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.FIREBASE_PRIVATE_KEY,
});
export const num = (v: string): number => Number.parseInt(v, 10);
export const capitalize = (s: string) => (!s ? s : s.charAt(0).toUpperCase() + s.slice(1));

export const transformQuery = (query: {[key: string]: string | number | boolean}) => {
	if (!Object.keys(query).length) {
		return '';
	}
	let transformed = '?';
	Object.entries(query).forEach(([key, value], i) => {
		if (value !== '') {
			transformed += `${!i ? '' : '&'}${key}=${encodeURIComponent(value)}`;
		}
	});
	return transformed;
};

type FormValue = string | boolean | number;
type FormValues = Record<string, FormValue>;
type ValueEntry = [key: string, value: FormValue];

const sorter = (a: ValueEntry, b: ValueEntry): number => {
	if (a[0] < b[0]) {
		return -1;
	}
	return a[0] > b[0] ? 1 : 0;
};

const reorderValues = (values: FormValues): FormValues => {
	const res: FormValues = {};
	Object.entries(values).sort(sorter).forEach(([key, value]) => {
		res[key] = value;
	});
	return res;
};

export const isFormChanged = (initValues: FormValues, values: FormValues) => JSON.stringify(reorderValues(initValues)) !== JSON.stringify(reorderValues(values));

export const generateSessionId = (): string => uuidv4();

const isSecureCookies = () => (process.env.SECURE_COOKIES === 'true' ? process.env.NODE_ENV !== 'development' : false);

export const cookieOptions = {
	path: '/', maxAge: 365 * 24 * 60 * 60, sameSite: 'lax', secure: isSecureCookies(),
};
