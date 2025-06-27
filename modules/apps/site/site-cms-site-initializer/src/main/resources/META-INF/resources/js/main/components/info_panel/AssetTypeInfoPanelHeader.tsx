import React, {useContext} from 'react';
import classnames from 'classnames';
import {AssetTypeInfoPanelContext} from "./context";
import {SidePanel} from "@clayui/core";
import ClayIcon from "@clayui/icon";
import {sub} from "frontend-js-web";
import {ASSET_TYPE} from "./util/constants";

const AssetTypeInfoPanelHeader = () => {
    const {icon, objectEntries = [], name, type} = useContext(AssetTypeInfoPanelContext);

    return (
        <>
            <SidePanel.Header>
                <SidePanel.Title>
                    {objectEntries?.length === 1 && (
                        <ClayIcon
                            className={classnames(
                                "asset-icon inline-item inline-item-before",
                                {
                                    'asset-icon-files': type ===
                                                        ASSET_TYPE.FILES,
                                }
                            )}
                            symbol={icon || ''}
                        >
                        </ClayIcon>
                    )}

                    <h3 className="asset-title inline-item inline-item-after">
                        {!objectEntries?.length && (
                            Liferay.Language.get('no-assets-selected')
                        )}

                        {objectEntries.length > 1 && (
                            sub(
                                Liferay.Language.get('x-assets-selected'),
                                objectEntries.length
                            )
                        )}

                        {(type === ASSET_TYPE.FILES || type ===
                          ASSET_TYPE.CONTENTS || type ===
                          ASSET_TYPE.FOLDER) && (
                             <>
                                 {name}
                             </>
                         )}
                    </h3>
                </SidePanel.Title>
            </SidePanel.Header>
        </>
    );
};

export default AssetTypeInfoPanelHeader;