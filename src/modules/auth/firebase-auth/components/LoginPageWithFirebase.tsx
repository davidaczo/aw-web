import clsx from 'clsx';
import {
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	setPersistence,
	signInWithEmailAndPassword, signInWithPopup, UserCredential,
} from 'firebase/auth';
import { Form, FormikProvider } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';

import nookies from 'nookies';
import { useCallback, useMemo, useState } from 'react';

import { cookieOptions } from '../../../../utils';
import { useJsonApi } from '../../../api/jsonApi';
import { PasswordField } from '../../../form/components/PasswordField';
import { TextField } from '../../../form/components/TextField';
// import { loadMe } from '../../../me/store/actions';
import { loadMe } from '../../../me/store/actions';
import { Button } from '../../../ui/components/Button';
import { Logo } from '../../../ui/components/Logo';
import { createErrorToast } from '../../../ui/toast/store/actions';

import { useFirebaseLoginForm } from '../forms/useFirebaseLoginForm';

import {
	auth,
	facebookProvider,
	getAppleProvider,
	googleProvider,
	sendEmailVerificationMailWithFirebase,
	SocialLoginType,
} from '../lib/firebase';
import { logInWithFirebase } from '../store/actions';
import { LoginResponseDto } from '../store/types';

import { LoginButtonGroup } from './LoginButtonGroup';

const LoginPageWithFirebase = () => {
	const api = useJsonApi();
	const { replace } = useRouter();
	const [showEmailForm, setShowEmailForm] = useState(false);
	const handleApiLogin = useCallback(async (userCredential: UserCredential, name?: string) => {
		const accessToken = await userCredential.user.getIdToken();
		nookies.set(undefined, 'refreshToken', userCredential.user.refreshToken, cookieOptions);
		api(logInWithFirebase({ accessToken, name }))
			.then(async ({ user, isNewUser }: LoginResponseDto) => {
				if (!user.isEmailVerified) {
					if (isNewUser && user.email) {
						sendEmailVerificationMailWithFirebase(false);
					}
					localStorage.setItem('verifyEmailCooldownUntil', String(Date.now() + 60_000));
					replace('/verify-email');
				} else {
					const me = await api(loadMe());
					if (!me) {
						createErrorToast('Failed to load user data, try again.');
						return;
					}
					replace('/');
				}
			});
	}, [api, replace]);
	const handleEmailLogin = useCallback(async (email: string, password: string) => {
		try {
			const userCredential = await setPersistence(auth, browserLocalPersistence).then(() => signInWithEmailAndPassword(auth, email, password));
			await handleApiLogin(userCredential);
		} catch (error: any) {
			createErrorToast(error?.code || 'Failed to log in');
		}
	}, [handleApiLogin]);

	const handleRegister = useCallback(async (email: string, password: string, name: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const mName = name.trim();
			await handleApiLogin(userCredential, mName);
		} catch (error: any) {
			createErrorToast(error?.code || 'Failed to register');
		}
	}, [handleApiLogin]);

	const { formik, formState } = useFirebaseLoginForm({ onLogin: handleEmailLogin, onRegister: handleRegister });
	const submitButtonText = useMemo(() => {
		switch (formState) {
			case 'EMAIL': default:
				return 'Continue';
			case 'LOGIN':
				return 'Sign in';
			case 'REGISTER':
				return 'Register';
		}
	}, [formState]);

	const handleSocialLogin = useCallback(async (type: SocialLoginType) => {
		try {
			let userCredential: UserCredential;
			switch (type) {
				case 'google':
				default:
					userCredential = await signInWithPopup(auth, googleProvider);
					break;
				case 'facebook':
					userCredential = await signInWithPopup(auth, facebookProvider);
					break;
				case 'apple':
					userCredential = await signInWithPopup(auth, getAppleProvider());
					break;
			}
			await handleApiLogin(userCredential);
		} catch (error: any) {
			createErrorToast(error?.code || 'Failed to log in');
		}
	}, [handleApiLogin]);

	return (
		<>
			<Head>
				<title>Log in - test</title>
			</Head>
			<div className='min-h-screen px-6 py-[60px]'>
				<div className='mx-auto w-full max-w-[320px]'>
					<Logo size={50} />
					<div className={clsx('flex flex-col items-center pb-2', showEmailForm && 'h-full justify-between')}>
						{showEmailForm ? (
							<div className='flex w-full max-w-[350px] flex-col items-center px-2'>
								<FormikProvider value={formik}>
									<Form className='w-full'>
										<div className='flex flex-col gap-4'>
											<TextField name='email' type='text' label='Email' />
											{formState === 'LOGIN' && (
												<PasswordField name='password' label='Password' />)}
											{formState === 'REGISTER' && (
												<>
													<TextField name='name' type='text' label='Name' />
													<PasswordField name='password' label='Password' />
												</>
											)}
										</div>
										<Button
											type='submit'
											variant='primary'
											size='sm'
											className='mt-8 w-full'
										>
											{submitButtonText}
										</Button>
										<Button
											variant='text'
											size='sm'
											className='mx-auto mt-2'
											type='button'
											onClick={() => setShowEmailForm(false)}
										>
											Back
										</Button>
									</Form>
								</FormikProvider>
							</div>
						) : (
							<LoginButtonGroup
								onSocialLogin={handleSocialLogin}
								onEmail={() => setShowEmailForm(true)}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPageWithFirebase;
