import type { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useJsonApi } from '../modules/api/jsonApi';

import type { AppThunk } from './store';
import { getEntitySelector, getEntityUpdateNeededSelector } from './utils';

type UseEntityVM<T> = {
	entity: T | null,
	updateNeeded: boolean,
}

type UseEntityProps = {
	sliceName: string,
	dataKey: string,
	updateFunc: (...args: any[]) => (api: AxiosInstance) => AppThunk,
}

export const useEntity = <T>({ sliceName, dataKey, updateFunc }: UseEntityProps): UseEntityVM<T> => {
	const entity = useSelector(getEntitySelector<T>(sliceName, false)(dataKey));
	const updateNeeded = useSelector(getEntityUpdateNeededSelector(sliceName, false)(dataKey));

	const api = useJsonApi();

	useEffect(() => {
		if (updateNeeded) {
			api(updateFunc(dataKey));
		}
	}, [updateNeeded, api, updateFunc, dataKey]);

	return { entity, updateNeeded };
};

type UseEntityListVM<T> = {
	list: T | null,
	updateNeeded: boolean,
}

type UseEntityListProps<F> = {
	sliceName: string,
	dataKey: string,
	updateFunc: (dataKey: string, filters?: F, ...args: any[]) => (api: AxiosInstance) => AppThunk,
}

export const useEntityList = <T, F>({ sliceName, dataKey, updateFunc }: UseEntityListProps<F>): UseEntityListVM<T> => {
	const list = useSelector(getEntitySelector<T>(sliceName, true)(dataKey));
	const updateNeeded = useSelector(getEntityUpdateNeededSelector(sliceName, true)(dataKey));

	const api = useJsonApi();

	useEffect(() => {
		if (updateNeeded) {
			api(updateFunc(dataKey));
		}
	}, [updateNeeded, api, updateFunc, dataKey]);

	return { list, updateNeeded };
};
