import type { AxiosInstance } from 'axios';

import { AppThunk } from '../../../../../store/store';
import { setData } from '../../slice';

export const loadMe  = (isEmailVerified = false) => (api: AxiosInstance): AppThunk => async (dispatch) => {
	try {
		let k: any = null;
		k = await api.get('firebase-auth/me', { params: { ...(isEmailVerified && { emailVerified: true }) } });
		dispatch(setData(k ? k  as any : null));
		if (k === undefined) {
			return Promise.reject();
		}
		return k;
	} catch (error) {
		return Promise.reject(error);
	}
};
