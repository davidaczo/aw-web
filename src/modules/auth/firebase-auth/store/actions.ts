import type { AxiosInstance } from 'axios';

import { AppThunk } from '../../../../store/store';
import { getErrorText } from '../../../../utils';
import { createErrorToast } from '../../../ui/toast/store/actions';

import { CheckEmailDto, LoginDto } from './types';

export const logInWithFirebase = (dto: LoginDto) => (api: AxiosInstance): AppThunk => async () => {
	try {
		return await api.post('firebase-auth', dto);
	} catch (error: any) {
		createErrorToast(getErrorText(error));
		return Promise.reject(error);
	}
};

export const checkEmailWithFirebase = (dto: CheckEmailDto) => (api: AxiosInstance): AppThunk => async () => {
	try {
		return await api.post('firebase-auth/check-email', dto);
	} catch (error: any) {
		createErrorToast(getErrorText(error));
		return Promise.reject(error);
	}
};
