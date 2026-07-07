/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */

import { AxiosInstance } from 'axios';
// import type { GetServerSidePropsResult } from 'next';

import type { AppStore } from '../store/store';

const isFirebaseEnabled = process.env.NEXT_PUBLIC_WITH_FIREBASE === 'true';
//
//
// export const getRedirect = (destination: string) => ({ redirect: { destination, permanent: false } });
// export const loginRedirect = getRedirect('/login');
// export const emptyResult: GetServerSidePropsResult<any> = { props: { } };
//
// const ssFirebaseTokenRefresh = async (ctx: any): Promise<GetServerSidePropsResult<any> | null> => {
// 	const { refreshToken } = nookies.get(ctx);
// 	if (!refreshToken) {
// 		nookies.destroy(ctx, 'token');
// 		return loginRedirect;
// 	}
//
// 	const apiKey = firebaseConfigMap[getAppType()]?.apiKey;
// 	if (!apiKey) {
// 		nookies.destroy(undefined, 'token');
// 		nookies.destroy(undefined, 'refreshToken');
// 		return loginRedirect;
// 	}
// 	try {
// 		console.log('Refreshing firebase token on serverside...');
// 		const response = await axios.post(
// 			`https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
// 			{
// 				grant_type: 'refresh_token',
// 				refresh_token: refreshToken,
// 			},
// 		);
//
// 		const newIdToken = response.data.id_token;
// 		const newRefreshToken = response.data.refresh_token || refreshToken;
// 		nookies.set(undefined, 'token', newIdToken, cookieOptions);
// 		nookies.set(undefined, 'refreshToken', newRefreshToken, cookieOptions);
//
// 		return null;
// 	} catch (error) {
// 		nookies.destroy(ctx, 'token');
// 		nookies.destroy(ctx, 'refreshToken');
// 		return loginRedirect;
// 	}
// };
// export const verifyEmailRedirect = getRedirect('/verify-email');
// export const homeRedirect = getRedirect('/');
//
// export const handleError = (error: any, ctx: any) => {
// 	if (error.code === 'UNAUTHORIZED') {
// 		if (getIsAppWithFirebase()) {
// 			setAuthCookies({}, ctx);
// 		}
// 		return loginRedirect;
// 	}
// 	return { props: { errorCode: error.code } };
// };

// export type RouteFunction = (store: AppStore, ctx: any, onNext?: RouteFunction | null) => Promise<GetServerSidePropsResult<any>>
// export type RouteFunctionWithApi = (api: AxiosInstance, store: AppStore, ctx: any, onNext?: RouteFunction | null) => Promise<GetServerSidePropsResult<any>>
// export const getQueryParam = (query: any, param: string): string => {
// 	const p = query[param];
// 	return (Array.isArray(p) ? p[0] : p) || '';
// };
//
// export const getPathname = (ctx: any, withQuery = false): string => {
// 	const parts = ctx.req.url.split('?');
// 	let pathname = parts[0];
// 	const query = parts[1];
// 	if (pathname.startsWith('/_next/')) {
// 		pathname = pathname.replace(/^\/_next\/data\/[^/]+/, '').replace(/\.json$/, '');
// 	}
// 	pathname = pathname === '/index' ? '/' : pathname;
// 	return `${pathname}${withQuery && !!query ? `?${query}` : ''}`;
// };
/* eslint-disable camelcase */
// export const privateRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => {
// 	const api = getJsonApi(ctx, store.getState, store.dispatch);
// 	const cookies = nookies.get(ctx);
// 	if (getIsAppWithFirebase()) {
// 		if (!cookies.token && !cookies.refreshToken) {
// 			return loginRedirect;
// 		}
//
// 		let me: UserDetailedDto;
// 		if (cookies.token) {
// 			try {
// 				await adminAuth.verifyIdToken(cookies.token);
// 			} catch (error: any) {
// 				if (error.code === 'auth/id-token-expired') {
// 					const refreshResult = await ssFirebaseTokenRefresh(ctx);
// 					if (refreshResult) {
// 						return refreshResult;
// 					}
// 				}
// 				nookies.destroy(ctx, 'token');
// 				nookies.destroy(ctx, 'refreshToken');
// 				return loginRedirect;
// 			}
//
// 			try {
// 				const emailVerified = getQueryParam(ctx.query, 'verified') === 'true';
// 				const pathname = getPathname(ctx);
// 				const isVerifyEmailPage = pathname.startsWith('/verify-email');
// 				me = await store.dispatch(loadMe(isVerifyEmailPage && emailVerified)(api));
//
// 				if (isVerifyEmailPage) {
// 					if (me.isEmailVerified) {
// 						return homeRedirect;
// 					}
// 				} else if (!me.isEmailVerified) {
// 					return verifyEmailRedirect;
// 				}
// 			} catch (error) {
// 				return handleError(error, ctx);
// 			}
// 		}
// 	} else {
// 		await store.dispatch(loadTokens(ctx));
// 		const payload: TokenPayload = store.getState().auth.tokenPayload;
// 		if (!payload) {
// 			return loginRedirect;
// 		}
// 		const {
// 			refreshToken, accessTokenExpiration, refreshTokenExpiration,
// 		} = payload;
// 		const d = new Date().getTime();
// 		if (d > accessTokenExpiration) {
// 			if (d > refreshTokenExpiration) {
// 				store.dispatch(setData(null));
// 				console.log('Both tokens expired, redirecting to login...');
// 				setAuthCookies({}, ctx);
// 				return loginRedirect;
// 			}
// 			try {
// 				// const api = axios.create({ baseURL: getApiHost(), headers: { 'Content-Type': 'application/json' }, withCredentials: true });
// 				const data: any = await api.post('auth/refresh-tokens', { refreshToken });
// 				console.log('Refreshed tokens:', data);
// 				setAuthCookies(data, ctx);
// 				store.dispatch(setData({
// 					accessToken: data.accessToken,
// 					refreshToken: data.refreshToken,
// 					accessTokenExpiration: data.accessTokenExpiration,
// 					refreshTokenExpiration: data.refreshTokenExpiration,
// 				}));
// 			} catch (error) {
// 				console.log('Failed to refresh tokens:', error);
// 				setAuthCookies({}, ctx);
// 				store.dispatch(setData(null));
// 				return loginRedirect;
// 			}
// 		}
// 	}
// 	try {
// 		await store.dispatch(loadMe()(api));
// 	} catch (error) {
// 		return handleError({ code: 'UNAUTHORIZED' }, ctx);
// 	}
// 	if (onNext) {
// 		return onNext(api, store, ctx);
// 	}
// 	return emptyResult;
// };
//
// export const publicOnlyRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => {
// 	const api = getJsonApi(ctx, store.getState, store.dispatch);
// 	const cookies = nookies.get(ctx);
// 	if (cookies?.token) {
// 		return homeRedirect;
// 	}
// 	if (onNext) {
// 		return onNext(api, store, ctx);
// 	}
// 	return emptyResult;
// };
//
// export const publicRoute: RouteFunction = async (store: AppStore, ctx: any, onNext: RouteFunction | null = null): Promise<GetServerSidePropsResult<any>> => {
// 	if (onNext) {
// 		return onNext(store, ctx);
// 	}
// 	return emptyResult;
// };
//
// export const adminRoute = async (store: AppStore, ctx: any, onNext: RouteFunctionWithApi | null = null): Promise<GetServerSidePropsResult<any>> => privateRoute(store, ctx, async () => {
// 	const api = getJsonApi(ctx, store.getState, store.dispatch);
// 	const me = store.getState().me.data;
// 	if (me.role !== 'ADMIN') {
// 		return handleError({ code: 'Access denied' }, ctx);
// 	}
// 	if (onNext) {
// 		return onNext(api, store, ctx);
// 	}
// 	return emptyResult;
// });

// let handleError: (error: any, ctx: any) => any;
//
// if (isFirebaseEnabled) {
// 	handleError = require('./firebase-navigation/firebaseNavigation').handleError;
// } else {
// 	handleError = require('./genesis-navigation/genesisNavigation').handleError;
// }
//
// let privateRoute: any;
//
// if (isFirebaseEnabled) {
// 	privateRoute = require('./firebase-navigation/firebaseNavigation').privateRoute;
// } else {
// 	privateRoute = require('./genesis-navigation/genesisNavigation').privateRoute;
// }
//
// let publicRoute: any;
// if (isFirebaseEnabled) {
// 	publicRoute = require('./firebase-navigation/firebaseNavigation').publicRoute;
// } else {
// 	publicRoute = require('./genesis-navigation/genesisNavigation').publicRoute;
// }
//
// let publicOnlyRoute: any;
//
// if (isFirebaseEnabled) {
// 	publicOnlyRoute = require('./firebase-navigation/firebaseNavigation').publicOnlyRoute;
// } else {
// 	publicOnlyRoute = require('./genesis-navigation/genesisNavigation').publicOnlyRoute;
// }
//
// let adminRoute: any;
//
// if (isFirebaseEnabled) {
// 	adminRoute = require('./firebase-navigation/firebaseNavigation').adminRoute;
// } else {
// 	adminRoute = require('./genesis-navigation/genesisNavigation').adminRoute;
// }
const nav =	isFirebaseEnabled
	? require('./firebase-navigation/firebaseNavigation')
	: require('./genesis-navigation/genesisNavigation');

export const {
	privateRoute, publicRoute, publicOnlyRoute, adminRoute, handleError,
} = await nav;
