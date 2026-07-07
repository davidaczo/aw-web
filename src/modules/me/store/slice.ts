import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { AppState } from '../../../store/store';
import type { FirebaseUserDetailedDto, UserDetailedDto } from '../../user/store/types';

export interface MeState {
	data: UserDetailedDto | FirebaseUserDetailedDto | null,
}

const initialState: MeState = {
	data: null,
};

export const meSlice = createSlice({
	name: 'me',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<UserDetailedDto| FirebaseUserDetailedDto | null>) => {
			state.data = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload.me,
		}),
	},
});

export const { setData } = meSlice.actions;

export const selectMe = (state: AppState): UserDetailedDto | null => state.me.data;
