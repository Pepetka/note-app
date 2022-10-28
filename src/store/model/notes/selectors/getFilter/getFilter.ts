import {createSelector} from '@reduxjs/toolkit';
import {getNotesState} from '../getState/getNotesState';
import {NotesSchema} from '../../types/NotesSchema';

export const getFilter = createSelector(getNotesState, (state: NotesSchema) => state.filter);
