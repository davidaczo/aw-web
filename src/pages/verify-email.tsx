import { onIdTokenChanged } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { Context } from 'next-redux-wrapper';
import nookies from 'nookies';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowLeft from '../assets/icons/arrow-left';
import { useJsonApi } from '../modules/api/jsonApi';
import { auth, sendEmailVerificationMailWithFirebase } from '../modules/auth/firebase-auth/lib/firebase';
import { loadMe } from '../modules/me/store/actions';
import { selectMe } from '../modules/me/store/slice';
import { Button } from '../modules/ui/components/Button';
import { privateRoute } from '../navigation/navigation';
import { wrapper } from '../store/store';
import { cookieOptions, getIsAppWithFirebase } from '../utils';

const COOLDOWN_MS = 60_000;

const VerifyEmailPage: NextPage = () => {
	const me = useSelector(selectMe);

	const router = useRouter();
	const api = useJsonApi();

	const [isSending, setIsSending] = useState(false);

	const [cooldownUntil, setCooldownUntil] = useState<number>(() => {
		try {
			const s = typeof window !== 'undefined' ? localStorage.getItem('verifyEmailCooldownUntil') : null;
			return s ? parseInt(s, 10) : 0;
		} catch {
			return 0;
		}
	});

	const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

	useEffect(() => {
		const tick = () => {
			const msLeft = Math.max(0, cooldownUntil - Date.now());
			const secs = Math.ceil(msLeft / 1000);
			setRemainingSeconds(secs);
			if (msLeft <= 0) {
				localStorage.removeItem('verifyEmailCooldownUntil');
			}
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [cooldownUntil]);

	const handleResendEmail = useCallback(async () => {
		if (isSending || remainingSeconds > 0) return;
		try {
			setIsSending(true);
			await sendEmailVerificationMailWithFirebase();
			const until = Date.now() + COOLDOWN_MS;
			setCooldownUntil(until);
			localStorage.setItem('verifyEmailCooldownUntil', String(until));
		} catch (e: any) {
			console.error('Failed to resend verification email:', e);
		} finally {
			setIsSending(false);
		}
	}, [isSending, remainingSeconds]);

	useEffect(() => {
		if (!me || !getIsAppWithFirebase()) return;
		if (me.isEmailVerified) {
			router.replace('/');
		}
		const unsubscribe = onIdTokenChanged(auth, async (user) => {
			if (user && user.emailVerified && !me?.isEmailVerified) {
				const token = await user.getIdToken(true);
				nookies.set(undefined, 'token', token, cookieOptions);
				await api(loadMe(true));
				router.replace('/');
			}
		});
		// eslint-disable-next-line consistent-return
		return () => unsubscribe();
	}, [api, router, me?.isEmailVerified]);

	if (!me) return null;

	const isOnCooldown = remainingSeconds > 0;

	return (
		<div className='min-h-screen'>
			<div className='px-6 py-[80px]'>
				<div className='break-smart mx-auto w-full max-w-[640px] px-6'>
					<p>
						{'We\'ve sent a verification email to '}
						<strong>{me.email}</strong>
						.
					</p>
					<br />
					<p>
						Please check your inbox and click the verification link to confirm your email address.
						If you don’t see the email, check your spam or junk folder.
					</p>

					<div className='mt-6 flex items-center'>
						<Button
							variant='text'
							size='sm'
							className='text-left'
							disabled={isSending || isOnCooldown}
							onClick={handleResendEmail}
						>
							{isOnCooldown ? `Resend available in ${remainingSeconds}s` : 'Resend email'}
						</Button>
					</div>
				</div>

				<div className='absolute left-4 top-4 z-20'>
					<Button
						variant='text'
						size='sm'
						className='text-black'
						LeftIcon={ArrowLeft}
						onClick={() => {
							nookies.destroy(undefined, 'token', cookieOptions);
							router.replace('/login');
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx: Context) => privateRoute(store, ctx, null),
);

export default VerifyEmailPage;
