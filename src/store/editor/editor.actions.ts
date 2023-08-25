import { Content, LayoutSection } from '@/lib/models/layout.model';
import { Property } from '@/lib/models/property.model';
import { Schema } from '@/lib/models/schema.model';

export interface SetDraft {
    schema: Schema;
}

export interface AddSection {
    section: LayoutSection;
}

export interface AddContentToSection {
    sectionIndex: number;
    content: Content;
}
export interface AddContent {
    sectionIndex: number;
    groupPath?: number[];
    content: Content;
}

export interface AddProperty {
    propertyKey: string;
    property: Property;
}
