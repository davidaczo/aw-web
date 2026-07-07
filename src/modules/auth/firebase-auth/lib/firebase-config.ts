import type { FirebaseOptions } from 'firebase/app';

export type AppType = 'DEV' | 'UAT' | 'PROD';
export const firebaseConfigMap: Record<AppType, FirebaseOptions | null> = {
	DEV: {
		apiKey: 'AIzaSyAl7onH3yup41Y3UR8lTujq12t0H8AkS3Y',
		authDomain: 'genesis-test-10484.firebaseapp.com',
		projectId: 'genesis-test-10484',
		storageBucket: 'genesis-test-10484.firebasestorage.app',
		messagingSenderId: '400125644820',
		appId: '1:400125644820:web:85ae0d826e6833a9ee5701',
		measurementId: 'G-JTMWV8DK3H',
	},
	UAT: {
		// apiKey: 'AIzaSyBvv7AKgsAVwHa1Y6BcBhvitKlKlnrcEXs',
		// authDomain: 'lokalli-uat.firebaseapp.com',
		// projectId: 'lokalli-uat',
		// storageBucket: 'lokalli-uat.firebasestorage.app',
		// messagingSenderId: '661095763316',
		// appId: '1:661095763316:web:0da0e69fd71ad00f8fb021',
	},
	PROD: null, // TODO,
};
