import React, {useState} from 'react';
import Tabs from "@clayui/tabs";
import {TABS} from "./tabs_content";
import {SidePanel} from "@clayui/core";

const AssetTypeInfoPanelFilesView = () => {

    const [active, setActive] = useState(0);

    const tabsEntries = Object.entries(TABS);

    return (
        <>
            <Tabs
                active={active}
                onActiveChange={setActive}
            >
                {tabsEntries.map(([key, value], index) => (
                    <Tabs.Item
                        key={`tab_${key}_${index}`}
                        innerProps={{
                            'aria-controls': `tabpanel-${value.id}`,
                        }}
                    >
                        {value.name}
                    </Tabs.Item>
                ))}
            </Tabs>

            <Tabs.Content active={active} fade>
                {tabsEntries.map(([key, Tab], index) => (
                    <Tabs.TabPane key={`pane_${key}_${index}`}>
                        <SidePanel.Body>
                            <Tab.component/>
                        </SidePanel.Body>
                    </Tabs.TabPane>
                ))}
            </Tabs.Content>
        </>
    );
};

export default AssetTypeInfoPanelFilesView;