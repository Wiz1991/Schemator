import { Alignment, Label, LabelOptions } from '@/lib/models/label.model';

export default interface LayoutConfig {
    sections: LayoutSection[];
}

export interface LayoutSection {
    /**
     * @description Optional specific layout. Will map to some component / css class
     */
    type?: LayoutType;
    /**
     * @description Acts as an identifer right now
     */
    name: string;
    /**
     * @description Decides on how to split the columns. Mapped to grid fr right now.
     * @example const ratio = [1,2,3]
     */
    columnRatio?: number[];

    /**
     * @description List of everything shown. Can be properties or groups
     */
    content: Content[];

    /**
     * @description Set the gap between the columns in rem
     *
     * @example gap = 1 => gap : 1rem
     */
    gap?: number;
}

export interface BaseContent {
    type: ContentType;

    /**
     * @description Defines the percent split of the label and input label% - input%. If undefined, will be set to [1, 4]
     * @example splitRatio = [1, 1], splitRatio = [1, 2]
     */
    splitRatio?: number[];

    /**
     * @description Depending on the render direction, it will set a gap in that axis
     */
    spacer?: number;
}

/**
 * @description Acts as a container around other groups and properties
 */
export interface Group extends BaseContent {
    type: ContentType.Group;
    label?: Label;
    name: string;
    /**
     * @description Decides how the contents are rendered. In a row or in a column
     */
    direction: 'row' | 'column';

    /**
     * @description Recursive list of other content
     */
    content: Content[];

    labelAlignment?: Alignment;

    /**
     * @description Set the gap between elements in rem
     *
     * @example gap = 1 => gap: 1rem
     */
    gap?: number;
}

/**
 * @description Acts as a reference to some property. This decides which property is rendered here.
 */
export interface PropertyRef extends BaseContent {
    type: ContentType.Property;
    /**
     * @description The property key of the property being referenced here.
     * It must actually exist in the properties dict
     */
    ref: string;

    /**
     * @description Additional options for rendering the label.
     * Unlike the group, the text for the label is taken from the property, and here we just have
     * some additional info.
     */
    labelOptions?: LabelOptions;
}

export interface ObjectContent extends BaseContent {
    type: ContentType.Object;
    ref: string;
    content: Content[];
}

export interface DialogContent extends BaseContent {
    type: ContentType.Dialog;
    ref: string;
    labelOptions?: LabelOptions;
}

/**
 * Discriminated union of all content types. Helps for nicer type guards
 */
export type Content = Group | PropertyRef | ObjectContent | DialogContent;

export enum ContentType {
    Group = 'group',
    Property = 'propertyRef',
    Object = 'objectContent',
    Dialog = 'dialogContent',
    ArrayRef = 'arrayPropertyRef',
}

export enum LayoutType {
    Columns = 'columns',
    ReportConfigurator = 'report-configurator',
    DataAcq = 'data-acquisition',
}
