import type { PayloadAction } from '@reduxjs/toolkit';
import type { WritableDraft } from 'immer';

import { HYDRATE } from 'next-redux-wrapper';

import { ApiAction } from '../modules/api/helpers';

import type { AppState, AppThunk } from './store';
import type { ListState } from './types';

export type EntityListState<List extends ListState<any, any>> = {
	entityList: { [key: string]: List },
	entityListUpdateNeeded: { [key: string]: boolean }
}

export type EntityState<DTO> = {
	entity: { [key: string]: DTO },
	entityUpdateNeeded: { [key: string]: boolean }
}

export const entityListInitialState: EntityListState<never> = {
	entityList: {},
	entityListUpdateNeeded: {},
};

export const entityInitialState: EntityState<never> = {
	entity: {},
	entityUpdateNeeded: {},
};

type EntityListReducers<State, List> = {
	setEntityList: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, data: List}>) => void;
	setEntityListUpdateNeeded: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, updateNeeded: boolean}>) => void;
};

export const getEntityListReducers = <State, List>(): EntityListReducers<State, List> => ({
	setEntityList: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, data: List }>) => {
		const { dataKey, data } = action.payload;
		(state as any).entityList[dataKey] = data;
	},
	setEntityListUpdateNeeded: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, updateNeeded: boolean }>) => {
		const { dataKey, updateNeeded } = action.payload;
		(state as any).entityListUpdateNeeded[dataKey] = updateNeeded;
	},
});

type EntityReducers<State, DTO> = {
	setEntity: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, data: DTO}>) => void;
	setEntityUpdateNeeded: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, updateNeeded: boolean}>) => void;
};

export const getEntityReducers = <State, DTO>(): EntityReducers<State, DTO> => ({
	setEntity: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, data: DTO }>) => {
		const { dataKey, data } = action.payload;
		(state as any).entity[dataKey] = data;
	},
	setEntityUpdateNeeded: (state: WritableDraft<State>, action: PayloadAction<{ dataKey: string, updateNeeded: boolean }>) => {
		const { dataKey, updateNeeded } = action.payload;
		(state as any).entityUpdateNeeded[dataKey] = updateNeeded;
	},
});

export const getEntitySelector = <T>(sliceName: string, isList: boolean) => (dataKey: any) => (state: AppState): T | null => {
	if (state[sliceName][`entity${isList ? 'List' : ''}`][dataKey]) {
		return state[sliceName][`entity${isList ? 'List' : ''}`][dataKey];
	}
	return null;
};

export const getEntityUpdateNeededSelector = (sliceName: string, isList: boolean) => (dataKey: any) =>
	(state: AppState): boolean => !!state[sliceName][`entity${isList ? 'List' : ''}UpdateNeeded`][dataKey];

type UpdateNeededSetterFunc = (payload: { dataKey: string, updateNeeded: boolean }) => any
export const getUpdateNeededFunc = (sliceName: string, setter: UpdateNeededSetterFunc, isList: boolean) =>
	(dataKey: string, updateNeeded: boolean): AppThunk =>
		(dispatch, getState) => {
			const current = getState()[sliceName][`entity${isList ? 'List' : ''}UpdateNeeded`];
			if (dataKey === 'all') {
				Object.keys(current).forEach((item) => {
					dispatch(setter({ dataKey: item, updateNeeded }));
				});
			} else {
				dispatch(setter({ dataKey, updateNeeded }));
			}
		};

export const getSliceParams = <State, List, Entity>(slice: string) => ({
	name: slice,
	initialState: {
		...entityListInitialState,
		...entityInitialState,
	},
	reducers: {
		...getEntityReducers<State, Entity>(),
		...getEntityListReducers<State, List>(),
	},
	extraReducers: {
		[HYDRATE]: (state: any, action: any) => ({
			...state,
			...action.payload[slice],
		}),
	},
});

export type WithLoadActions<P> = P & { loadActions?: (dataKey?: string) => ApiAction[] }
export const getLoadActions = (components: Array<WithLoadActions<any>>, dataKey?: string) => {
	let res: ApiAction[] = [];
	components.forEach((Component) => {
		if (Component?.loadActions) {
			const actions = Component.loadActions(dataKey);
			if (Array.isArray(actions) && actions.length) {
				res = [...res, ...actions];
			}
		}
	});
	return res;
};
