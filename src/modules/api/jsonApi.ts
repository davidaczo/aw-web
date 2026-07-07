/* eslint-disable import/no-mutable-exports */
/* eslint-disable global-require */
import axios, { AxiosInstance } from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useStore } from 'react-redux';

import { AppDispatch, useAppDispatch } from '../../store/store';
import { getApiHost } from '../../utils';

import { ApiAction, executeAction } from './helpers';

const headers = { 'Content-Type': 'application/json' };
const isFirebaseEnabled = process.env.NEXT_PUBLIC_WITH_FIREBASE === 'true';

type InterceptorFn = (
	context: any,
	instance: AxiosInstance,
	getState: any,
	dispatch?: any,
	router?: NextRouter,
	genesisRefreshApi?: AxiosInstance,
) => AxiosInstance;

let interceptors: InterceptorFn;
if (isFirebaseEnabled) {
	interceptors = require('./interceptors/firebase-interceptors/firebaseInterceptors').default;
} else {
	interceptors = require('./interceptors/genesis-interceptors/genesisInterceptors').default;
}

export const getJsonApi = (context: any, getState: any, dispatch?: AppDispatch, router?: NextRouter): AxiosInstance => {
	const apiHost = getApiHost();
	const instance = axios.create({ baseURL: apiHost, headers, withCredentials: true });
	const genesisRefreshApi = axios.create({ baseURL: apiHost, headers, withCredentials: true });
	return interceptors(context, instance, getState, dispatch, router, genesisRefreshApi);
};

export const ssrApi = async (action: ApiAction | ApiAction[], api: AxiosInstance, dispatch: AppDispatch) => executeAction(action, api, dispatch);

export const useJsonApi = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const s = useStore();

	const instance = useMemo(() =>
		getJsonApi(undefined, s.getState, dispatch, router),
	[s.getState, dispatch, router]);

	return useCallback(async (action: ApiAction | ApiAction[]): Promise<any> => executeAction(action, instance, dispatch), [instance, dispatch]);
};
