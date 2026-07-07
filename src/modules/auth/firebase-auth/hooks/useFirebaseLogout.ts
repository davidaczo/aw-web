// This file will ONLY be bundled for the Firebase build.

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useCallback } from 'react';

import { createErrorToast } from '../../../ui/toast/store/actions';
import { auth } from '../lib/firebase';

export const useLogout = () => {
	const { replace } = useRouter();

	const handleLogout = useCallback(async () => {
		try {
			await signOut(auth);
			nookies.destroy(undefined, 'token');
			nookies.destroy(undefined, 'refreshToken');

			setTimeout(() => {
				replace('/login');
			}, 800);
		} catch (error) {
			createErrorToast('Failed to log out');
		}
	}, []);

	return { handleLogout };
};
