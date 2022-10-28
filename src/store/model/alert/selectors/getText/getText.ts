import {createSelector} from '@reduxjs/toolkit';
import {getAlertState} from '../getState/getAlertState';
import {AlertSchema} from '../../types/AlertSchema';

export const getText = createSelector(getAlertState, (state: AlertSchema) => state.text);
