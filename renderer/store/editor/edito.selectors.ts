import { Content } from '@/lib/models/layout.model';
import { findContent } from '@/store/editor/finders';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const selectEditor = (state: RootState) => state.editor;

export const selectSections = createSelector(selectEditor, (state) => {
    if (!state.draft) {
        throw new Error('No draft available. ');
    }
    return state.draft.template.sections;
});

export const selectSectionByIndex = (state: RootState, index: number) => {
    const { editor } = state;
    if (!editor.draft) {
        throw new Error('No draft available. ');
    }
    return editor.draft.template.sections[index];
};

export const selectContentByGroupPath = (
    state: RootState,
    sectionIndex: number,
    groupPath: number[]
) => {
    const section = state.editor.draft.template.sections[sectionIndex];

    return findContent<Content>(section.content, groupPath);
};
