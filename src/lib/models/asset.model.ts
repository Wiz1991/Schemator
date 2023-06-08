//TODO: Add missing types to union (KmItmeType)
export type AssetType =
    | 'REPORT30'
    | 'REPITEM'
    | 'SIGNALITEM'
    | 'SIGNALCHANNEL'
    | string;
export type ID = string;

export interface Asset {
    id: ID;
    type: AssetType;
    subtype?: string;
    parentId: ID | null;
    name: string;
    [key: string]: any;
}
