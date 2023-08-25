import { AssetType } from '@/lib/models/asset.model';
import LayoutConfig from '@/lib/models/layout.model';
import { Property } from '@/lib/models/property.model';

export type AssetSchemaProperties = Record<string, Property>;

export interface Schema {
    /**
     * @description What type this asset is. For example: "Signal"
     */
    type: AssetType;

    /**
     * @description Instance of the type. For example "CLC Log", this is a subtype of "Log".
     * It's optional because not all types have subtypes
     */
    subType?: string;

    /**
     * @description Configuration of how this schema is to be rendered.
     * Contains grouping of properties as well as placement of everything
     */
    template: LayoutConfig;
    /**
     * @description KV pair of the property key and its value
     */
    properties: AssetSchemaProperties;
}

export enum PersistencyState {
    New = 'New',
    Persisted = 'Persisted',
    Modified = 'Modified',
    Deleted = 'Deleted',
}
