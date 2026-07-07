import { AxiosInstance } from 'axios';
import { NextRouter } from 'next/router';

import nookies from 'nookies';

import type { AppDispatch } from '../../../../store/store';

const firebaseInterceptors = (context: any, instance: AxiosInstance, getState: any, dispatch?: AppDispatch, router?: NextRouter) : AxiosInstance => {
	instance.interceptors.request.use(
		async (req) => {
			const cookies = nookies.get(context);
			if (cookies.token) {
				req.headers['x-access-token'] = cookies.token;
			}
			return req;
		},
		(error) => Promise.reject(error),
	);
	instance.interceptors.response.use(
		(res) =>
			res.data,
		(error) => {
			let errorCode = 'UNKNOWN_ERROR';
			let errorResponse = null;

			if (error) {
				if (error.response) {
					if (error.response.status) {
						if (error.response.status === 400) {
							errorCode = 'BAD_REQUEST';
						}

						if (error.response.status === 401) {
							if (router) {
								nookies.destroy(undefined, 'token');
								nookies.destroy(undefined, 'refreshToken');
								router.replace('/login');
							}
							return Promise.reject({ code: 'UNAUTHORIZED' });
						}

						if (error.response.status === 403) {
							errorCode = 'FORBIDDEN';
						}

						if (error.response.status === 404) {
							errorCode = 'PAGE_NOT_FOUND';
						}

						if (error.response.status === 406) {
							errorCode = 'VALIDATION_ERROR';
						}

						if (error.response.status >= 500) {
							errorCode = 'INTERNAL_SERVER_ERROR';
						}
					}

					if (error.response.data?.error?.code) {
						errorResponse = error.response.data.error;
						errorCode = error.response.data.error.code;
					}
				} else {
					errorCode = 'NETWORK_ERROR';
				}
			}

			return Promise.reject(errorResponse || { code: errorCode });
		},
	);
	return instance;
};

export default firebaseInterceptors;
