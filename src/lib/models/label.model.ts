/**
 * @description Contains the text and the options for this label. Used in groups
 */
interface Label {
    /**
     * @description HTML or raw text that is to be shown for the label
     * @example
     * const rawLabel: Label = {
     *  text: "Example",
     * }
     *
     * const htmlLabel: Label {
     *  text: "<h1>Example</h1>"
     * }
     */
    text: string;
    options?: LabelOptions;
}

export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

/**
 * @description Advanced label rendering options
 */
export interface LabelOptions {
    /**
     * @description Where, relative to the input, will the label be placed
     */
    position: Position;
    /**
     * @description How to align the text inside the label container
     */
    alignment: Alignment;
    /**
     * @description Chooses whether the label should be displayed at all.
     */
    display?: boolean;
}

export type { Label };
