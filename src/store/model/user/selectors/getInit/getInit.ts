import {createSelector} from '@reduxjs/toolkit';
import {getUserState} from '../getState/getUserState';
import {UserSchema} from '../../types/UserSchema';

export const getInit = createSelector(getUserState, (state: UserSchema) => state._init);
