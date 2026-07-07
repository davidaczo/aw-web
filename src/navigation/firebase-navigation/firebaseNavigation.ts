// import type { ParsedUrlQuery } from 'querystring';

import axios, { AxiosInstance } from 'axios';
import type { GetServerSidePropsResult } from 'next';
import nookies from 'nookies';

import { getJsonApi } from '../../modules/api/jsonApi';
import { adminAuth } from '../../modules/auth/firebase-auth/lib/firebase-admin';
import { firebaseConfigMap } from '../../modules/auth/firebase-auth/lib/firebase-config';
import { loadMe } from '../../modules/me/store/actions';
import { UserDetailedDto } from '../../modules/user/store/types';
import { AppStore } from '../../store/store';
import { cookieOptions, getAppType } from '../../utils';
import {
	emptyResult,
	getPathname,
	getQueryParam,
	homeRedirect,
	loginRedirect,
	RouteFunction,
	RouteFunctionWithApi,
	verifyEmailRedirect,
} from '../helpers';

const ssFirebaseTokenRefresh = async (ctx: any): Promise<GetServerSidePropsResult<any> | null> => {
	const { refreshToken } = nookies.get(ctx);
	if (!refreshToken) {
		nookies.destroy(ctx, 'token');
		return loginRedirect;
	}

	const apiKey = firebaseConfigMap[getAppType()]?.apiKey;
	if (!apiKey) {
		nookies.destroy(undefined, 'token');
		nookies.destroy(undefined, 'refreshToken');
		return loginRedirect;
	}
	try {
		const response = await axios.post(
            `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
            { grant_type: 'refresh_token', refresh_token: refreshToken },
		);

		const newIdToken = response.data.id_token;
		const newRefreshToken = response.data.refresh_token || refreshToken;
		nookies.set(undefined, 'token', newIdToken, cookieOptions);
		nookies.set(undefined, 'refreshToken', newRefreshToken, cookieOptions);

		return null;
	} catch (error) {
		nookies.destroy(ctx, 'token');
		nookies.destroy(ctx, 'refreshToken');
		return loginRedirect;
	}
};
export const handleError = (error: any, ctx: any) => {
	if (error.code === 'UNAUTHORIZED') {
		return loginRedirect;
	}
	return { props: { errorCode: error.code } };
};

/* eslint-disable camelcase */
export const privateRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => {
	const api = getJsonApi(ctx, store.getState, store.dispatch);
	const cookies = nookies.get(ctx);
	if (!cookies.token && !cookies.refreshToken) {
		return loginRedirect;
	}

	let me: UserDetailedDto;
	if (cookies.token) {
		try {
			await adminAuth.verifyIdToken(cookies.token);
		} catch (error: any) {
			if (error.code === 'auth/id-token-expired') {
				const refreshResult = await ssFirebaseTokenRefresh(ctx);
				if (refreshResult) {
					return refreshResult;
				}
			}
			nookies.destroy(ctx, 'token');
			nookies.destroy(ctx, 'refreshToken');
			return loginRedirect;
		}

		try {
			const emailVerified = getQueryParam(ctx.query, 'verified') === 'true';
			const pathname = getPathname(ctx);
			const isVerifyEmailPage = pathname.startsWith('/verify-email');
			me = await store.dispatch(loadMe(isVerifyEmailPage && emailVerified)(api));

			if (isVerifyEmailPage) {
				if (me.isEmailVerified) {
					return homeRedirect;
				}
			} else if (!me.isEmailVerified) {
				return verifyEmailRedirect;
			}
		} catch (error) {
			return handleError(error, ctx);
		}
	}
	try {
		await store.dispatch(loadMe()(api));
	} catch (error) {
		return handleError({ code: 'UNAUTHORIZED' }, ctx);
	}
	if (onNext) {
		return onNext(api, store, ctx);
	}
	return emptyResult;
};

export const publicOnlyRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => {
	const api = getJsonApi(ctx, store.getState, store.dispatch);
	const cookies = nookies.get(ctx);
	if (cookies?.token) {
		return homeRedirect;
	}
	if (onNext) {
		return onNext(api, store, ctx);
	}
	return emptyResult;
};

export const publicRoute: RouteFunction = async (store: AppStore, ctx: any, onNext: RouteFunction | null = null): Promise<GetServerSidePropsResult<any>> => {
	if (onNext) {
		return onNext(store, ctx);
	}
	return emptyResult;
};

export const adminRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => privateRoute(store, ctx, async () => {
	const api = getJsonApi(ctx, store.getState, store.dispatch);
	const me = store.getState().me.data;
	if (me.role !== 'ADMIN') {
		return handleError({ code: 'Access denied' }, ctx);
	}
	if (onNext) {
		return onNext(api, store, ctx);
	}
	return emptyResult;
});
