import type { AxiosInstance } from 'axios';

import type { AppThunk } from '../../../store/store';
import { getErrorText } from '../../../utils';
import { loadMe } from '../../me/store/actions';
import { createErrorToast, createSuccessToast } from '../../ui/toast/store/actions';

import type { PasswordChangeDto, PasswordResetDto, UpdateMeDto } from './types';

export const updateMe = (dto: UpdateMeDto) => (api: AxiosInstance): AppThunk => async (dispatch) => {
	try {
		await api.put('users/me', dto);
		dispatch(loadMe()(api));
		return Promise.resolve();
	} catch (error: any) {
		createErrorToast(getErrorText(error, 'Failed to update your data'));
		return Promise.reject(error);
	}
};

export const validatePasswordResetToken = (token: string) => (api: AxiosInstance): AppThunk => async () => {
	try {
		const data = await api.get(`users/me/reset-password/validate?token=${token}`);
		return Promise.resolve(data);
	} catch (error: any) {
		return Promise.reject(error);
	}
};

export const changePassword = (dto: PasswordChangeDto) => (api: AxiosInstance): AppThunk => async () => {
	try {
		await api.post('users/me/change-password', dto);
		createSuccessToast('Your password has been changed');
		return Promise.resolve();
	} catch (error: any) {
		createErrorToast(getErrorText(error, 'Failed to change password'));
		return Promise.reject(error);
	}
};

export const resetPassword = (dto: PasswordResetDto) => (api: AxiosInstance): AppThunk => async () => {
	try {
		await api.post('users/me/reset-password', dto);
		createSuccessToast('Your password has been reset');
		return Promise.resolve();
	} catch (error: any) {
		createSuccessToast(getErrorText(error, 'Failed to reset your password'));
		return Promise.reject(error);
	}
};
