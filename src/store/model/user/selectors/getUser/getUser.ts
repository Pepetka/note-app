import {createSelector} from '@reduxjs/toolkit';
import {getUserState} from '../getState/getUserState';

export const getUser = createSelector(getUserState, (state) => state?.user);
