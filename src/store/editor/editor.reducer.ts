import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { Schema } from '@/lib/models/schema.model';
import {
    AddContent,
    AddContentToSection,
    AddProperty,
    AddSection,
} from '@/store/editor/editor.actions';
import { findContent } from '@/store/editor/finders';
import { Group, LayoutType } from '@/lib/models/layout.model';
import { group } from 'console';
import { Palanquin } from 'next/font/google';

export interface EditorState {
    draft: Schema | null;
}

const initialState: EditorState = {
    draft: {
        template: {
            sections: [],
        },
        properties: {},
        type: 'Test',
    },
};

export const counterSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        addSection: (
            state,
            { payload: { section } }: PayloadAction<AddSection>
        ) => {
            if (!state.draft) {
                throw new Error("Draft does not exist. Can't add section. ");
            }
            state.draft.template.sections.push(section);
        },
        addContentToSection: (
            state,
            {
                payload: { content, sectionIndex },
            }: PayloadAction<AddContentToSection>
        ) => {
            if (!state.draft) {
                throw new Error("Draft does not exist. Can't add section. ");
            }
            state.draft.template.sections[sectionIndex].content.push(content);
        },
        addContent: (state, { payload }: PayloadAction<AddContent>) => {
            if (!state.draft) {
                throw new Error("Draft does not exist. Can't add section. ");
            }

            const section = state.draft.template.sections[payload.sectionIndex];

            console.log(payload.groupPath);

            if (!payload.groupPath) {
                section.content.push(payload.content);
                return;
            }

            const content = findContent<Group>(
                section?.content,
                payload.groupPath
            );

            console.log(current(content));

            if (!content) {
                throw new Error('Failed to find that content in state');
            }

            content.content.push(payload.content);
        },
        addProperty: (
            state,
            { payload: { property, propertyKey } }: PayloadAction<AddProperty>
        ) => {
            if (!state.draft) {
                throw new Error("Draft does not exist. Can't add section. ");
            }
            state.draft.properties[propertyKey] = property;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addContent, addContentToSection, addProperty, addSection } =
    counterSlice.actions;

export default counterSlice.reducer;
