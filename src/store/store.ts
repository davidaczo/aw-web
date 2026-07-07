import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { NextPageContext } from 'next';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';

import { meSlice } from '../modules/me/store/slice';

const makeStore: any = (context: NextPageContext) => configureStore({
	reducer: {
		[meSlice.name]: meSlice.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
	>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV === 'development' });
