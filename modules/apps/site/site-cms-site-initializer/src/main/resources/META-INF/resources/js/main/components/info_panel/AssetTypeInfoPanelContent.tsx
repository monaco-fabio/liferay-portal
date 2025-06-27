//@ts-ignore

/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {Button, SidePanel} from "@clayui/core";
import AssetTypeInfoPanelHeader from "./AssetTypeInfoPanelHeader";
import AssetTypeInfoPanelBody from "./AssetTypeInfoPanelBody";
import {AssetTypeInfoPanelContext} from "./context";
import '../../../../css/components/AssetTypeInfoPanel.scss';
import {getBaseAssetInfo} from "./util";
import {
    ASSET_DATA,
} from "./util/eventsDefinitions";

const AssetTypeInfoPanelContent = () => {
    let assetInfo = {};
    const [objectEntries, setObjectEntries] = useState([]);

    useEffect(() => {
        const handler = (objectEntries: any[] = []) => {
            setObjectEntries(objectEntries as any[]);
        };

        Liferay.on(ASSET_DATA, handler);

        return () => {
            Liferay.detach(ASSET_DATA, handler);
        }
    })

    if (objectEntries.length === 1) {
        assetInfo = getBaseAssetInfo(objectEntries[0]);
    }

    return (
        <>
            <AssetTypeInfoPanelContext.Provider value={{
                objectEntries,
                ...assetInfo,
            }}>
                <AssetTypeInfoPanelHeader/>

                <AssetTypeInfoPanelBody/>
            </AssetTypeInfoPanelContext.Provider>
        </>
    );
};

export default AssetTypeInfoPanelContent;

