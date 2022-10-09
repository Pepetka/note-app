import {createSelector} from '@reduxjs/toolkit';
import {getNotesState} from '../getState/getNotesState';
import {NotesSchema} from '../../types/NotesSchema';

export const getError = createSelector(getNotesState, (state: NotesSchema) => state.error);
