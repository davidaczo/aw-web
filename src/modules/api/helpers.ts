import type { AxiosInstance } from 'axios';

import type { AppDispatch, AppThunk } from '../../store/store';

export type ApiAction = (axiosInstance: AxiosInstance) => AppThunk

export const executeAction = async (action: ApiAction | ApiAction[], api: AxiosInstance, dispatch: AppDispatch) => {
	if (Array.isArray(action)) {
		const a = [...action];
		const first: any = a.shift();
		const firstRes = await dispatch(first(api));
		return a.length ? Promise.all(a.map((ac) => dispatch(ac(api)))) : firstRes;
	}
	return dispatch(action(api));
};
