export enum PropertyType {
    Text = 'text',
    Number = 'number',
    Boolean = 'boolean',
    Date = 'date',
    Select = 'select',
    Ref = 'ref',
    Code = 'code',
    Function = 'function',
    MultiSelect = 'multiSelect',
    Switch = 'switch',
    TriState = 'triState',
    Object = 'object',
    Formula = 'formula',
}

/// This is information all of the properties have. Then depending on the type, there are additional fields.
/// This is why there is a discriminated union here.
export interface BaseProperty {
    hasCallback: boolean;
    displayName?: string;
    required?: boolean;
}

export interface TextProperty extends BaseProperty {
    type: PropertyType.Text;
    minLength?: number;
    maxLength?: number;
    regex?: string;
}

export interface NumberProperty extends BaseProperty {
    type: PropertyType.Number;
    min?: number;
    max?: number;
}

export interface BooleanProperty extends BaseProperty {
    type: PropertyType.Boolean;
}

export interface DateProperty extends BaseProperty {
    type: PropertyType.Date;
    before?: string;
    after?: string;
}

export interface RefProperty extends BaseProperty {
    type: PropertyType.Ref;
    allowedRefs: string[];
    displayValue?: string;
}

export interface MultiSelectProperty extends BaseProperty {
    type: PropertyType.MultiSelect;
    options: string[];
    multiple: boolean;
    allowCreate: boolean;
}

export interface SelectProperty extends BaseProperty {
    type: PropertyType.Select;
    options: string[];
    allowCreate: boolean;
}

export interface CodeProperty extends BaseProperty {
    type: PropertyType.Code;
    format?: string;
}

export interface FormulaProperty extends BaseProperty {
    type: PropertyType.Formula;
    format?: string;
}

export interface FunctionProperty extends BaseProperty {
    type: PropertyType.Function;
    allowedRefs: string[];
}

export interface SwitchProperty extends BaseProperty {
    type: PropertyType.Switch;
}

export interface TriStateProperty extends BaseProperty {
    type: PropertyType.TriState;
}

export interface ObjectProperty extends BaseProperty {
    type: PropertyType.Object;
    key: string;
    path?: string;
    properties: Record<string, Property>;
    isPojo: boolean;
}

// https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
type Property =
    | TextProperty
    | NumberProperty
    | BooleanProperty
    | DateProperty
    | RefProperty
    | FunctionProperty
    | SelectProperty
    | TriStateProperty
    | MultiSelectProperty
    | SwitchProperty
    | ObjectProperty
    | FormulaProperty
    | CodeProperty;

export type { Property };
