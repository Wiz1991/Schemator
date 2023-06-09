import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const selectEditor = (state: RootState) => state.editor;

export const selectSections = createSelector(selectEditor, (state) => {
    if (!state.draft) {
        throw new Error('No draft available. ');
    }
    return state.draft.template.sections;
});
