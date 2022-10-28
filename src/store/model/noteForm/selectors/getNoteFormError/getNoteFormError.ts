import {createSelector} from '@reduxjs/toolkit';
import {getNoteFormState} from '../getNoteFormState/getNoteFormState';
import {NoteFormSchema} from '../../types/NoteFormSchema';

export const getNoteFormError = createSelector(getNoteFormState, (state?: NoteFormSchema) => state?.error ?? undefined);
