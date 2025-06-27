import React from 'react';

interface IAssetTypeSidePanelContext {
    externalReferenceCode?: string | null;
    icon?: string | null;
    id?: number | null;
    items?: number | null;
    name?: string | null;
    objectEntries?: any[];
    type?: string | null;
}

const BASE_CONTEXT: IAssetTypeSidePanelContext = {
    externalReferenceCode: null,
    icon: null,
    id: null,
    items: null,
    name: null,
    objectEntries: [],
    type: null,
};

export const AssetTypeInfoPanelContext = React.createContext(BASE_CONTEXT);