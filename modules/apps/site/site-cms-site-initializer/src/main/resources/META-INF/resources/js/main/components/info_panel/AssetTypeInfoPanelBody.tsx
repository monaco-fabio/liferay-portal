import React, {useContext} from 'react';
import {AssetTypeInfoPanelContext} from "./context";
import AssetTypeInfoPanelFilesView from "./AssetTypeInfoPanelFilesView";
import AssetTypeInfoPanelEmptyState from "./AssetTypeInfoPanelEmptyState";
import AssetTypeInfoPanelFolderView from "./AssetTypeInfoPanelFolderView";
import {ASSET_TYPE} from "./util/constants";

const AssetTypeInfoPanelBody = () => {
    const {
        objectEntries = [],
        type,
    } = useContext(AssetTypeInfoPanelContext);

    return (
        <>
            {(objectEntries.length > 1 || !objectEntries.length)
                ? <AssetTypeInfoPanelEmptyState/>
                : (type === ASSET_TYPE.FOLDER)
                    ? <AssetTypeInfoPanelFolderView/>
                    : <AssetTypeInfoPanelFilesView />
            }
        </>
    );
};

export default AssetTypeInfoPanelBody;