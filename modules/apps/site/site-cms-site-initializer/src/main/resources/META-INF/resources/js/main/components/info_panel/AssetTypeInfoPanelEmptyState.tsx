import React, {useContext} from 'react';
import {AssetTypeInfoPanelContext} from "./context";
import {getImage} from "../../util/getImage";
import ClayEmptyState from "@clayui/empty-state";
import {ASSET_TYPE} from "./util/constants";
import {SidePanel} from "@clayui/core";

const AssetTypeInfoPanelEmptyState = () => {
    const {
        type,
    } = useContext(AssetTypeInfoPanelContext);

    return (
        <>
            {type === ASSET_TYPE.EMPTY ?
                <>
                    <div className="autofit-col">
                        <SidePanel.Body>
                            <ClayEmptyState
                                className="justify-content-center structure-builder__empty-state"
                                description={Liferay.Language.get('click-on-an-asset-to-see-its-details')}
                                imgSrc={getImage('empty_selection_state.svg')}
                                imgSrcReducedMotion={getImage(
                                    'empty_selection_state.svg')}
                                small
                                title={null}
                            />
                        </SidePanel.Body>
                    </div>
                </>
                :
                <div className="autofit-col">
                    <ClayEmptyState
                        className="justify-content-center structure-builder__empty-state"
                        description=""
                        imgSrc={getImage('multiselection_state.svg')}
                        imgSrcReducedMotion={getImage(
                            'multiselection_state.svg')}
                        small
                        title={null}
                    />
                </div>
            }
        </>
    );
};


export default AssetTypeInfoPanelEmptyState;