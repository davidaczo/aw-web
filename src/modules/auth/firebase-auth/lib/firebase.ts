import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	OAuthProvider,
	sendPasswordResetEmail,
	sendEmailVerification,
} from 'firebase/auth';

import { getAppType, getFrontendHost } from '../../../../utils';
import { createErrorToast, createSuccessToast } from '../../../ui/toast/store/actions';

import { firebaseConfigMap } from './firebase-config';

const firebaseConfig = firebaseConfigMap[getAppType()];

if (!firebaseConfig) {
	throw new Error('No firebase config');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const getAppleProvider = () => {
	const provider = new OAuthProvider('apple.com');
	provider.addScope('email');
	provider.addScope('name');
	return provider;
};

export const sendResetPasswordEmailWithFirebase = async (email: string) => {
	try {
		await sendPasswordResetEmail(auth, email);
		createSuccessToast('Password reset email sent');
	} catch (error: any) {
		createErrorToast('Failed to send password reset email');
	}
};

export const sendEmailVerificationMailWithFirebase = async (withSuccessToast = true) => {
	try {
		const user = auth.currentUser;
		if (user) {
			await sendEmailVerification(user, { url: `${getFrontendHost()}/verify-email?verified=true` });
		}
		if (withSuccessToast) {
			createSuccessToast('Email verification mail sent');
		}
	} catch (error: any) {
		createErrorToast(error?.code || 'Failed to send email verification mail');
	}
};

export type SocialLoginType = 'google' | 'facebook' | 'apple';
