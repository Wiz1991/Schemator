import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { Schema } from '@/lib/models/schema.model';
import {
    AddContent,
    AddContentToSection,
    AddProperty,
    AddSection,
    UpdateContent,
} from '@/store/editor/editor.actions';
import { findContent } from '@/store/editor/finders';
import { Group } from '@/lib/models/layout.model';

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
        updateContent: (state, { payload }: PayloadAction<UpdateContent>) => {
            const section = state.draft.template.sections[payload.sectionIndex];

            let content = findContent(section.content, payload.groupPath);

            content = { ...content, ...payload.content };

            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addContent, addContentToSection, addProperty, addSection, updateContent } =
    counterSlice.actions;

export default counterSlice.reducer;
