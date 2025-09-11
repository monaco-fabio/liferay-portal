/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import Button, {ClayButtonWithIcon} from '@clayui/button';
import DropDown from '@clayui/drop-down';
import React from 'react';

import Badge from '@clayui/badge';
import classnames from 'classnames';

import TaskStatusDropdownItemList
    from './../components/TaskStatusDropdownItemList';

function TaskStatusDropdown({
    active,
    getTaskItems,
    isVisible,
    processingTasks,
    setActive,
    setIsVisible,
    taskItems,
}: any
) {
    const handleActiveChange = (newActive: boolean) => {
        setActive(newActive);

        if (newActive) {
            getTaskItems();
        }
    };

    return (
        <>
            {isVisible ? (
                <div className="p-2">
					<span className="d-flex">
						{processingTasks > 0 ? (
                            <DropDown
                                active={active}
                                onActiveChange={handleActiveChange}
                                trigger={
                                    <Button
                                        className={classnames({
                                            'btn-sm border-info text-info pb-1':
                                                !active,
                                            'btn-sm btn-info pb-1': active,
                                        })}
                                        displayType="secondary"
                                    >
                                        <Badge
                                            className={classnames({
                                                'mr-2 badge-info': !active,
                                                'mr-2 badge-light': active,
                                            })}
                                            label={processingTasks}
                                        />

                                        {processingTasks === 1
                                            ? Liferay.Language.get(
                                                'processing-task'
                                            )
                                            : Liferay.Language.get(
                                                'processing-tasks'
                                            )}
                                    </Button>
                                }
                                triggerIcon={
                                    active ? 'caret-top' : 'caret-bottom'
                                }
                            >
                                <TaskStatusDropdownItemList items={taskItems}/>
                            </DropDown>
                        ) : (
                            <Button.Group>
                                <ClayButtonWithIcon
                                    aria-label="close"
                                    className="btn-sm close-button"
                                    displayType="secondary"
                                    onClick={() => setIsVisible(false)}
                                    symbol="times"
                                    title="close"
                                />

                                <DropDown
                                    active={active}
                                    className="task-status-dropdown"
                                    onActiveChange={handleActiveChange}
                                    trigger={
                                        <Button
                                            className="btn-sm"
                                            displayType="secondary"
                                        >
                                            {Liferay.Language.get(
                                                'no-processing-tasks'
                                            )}
                                        </Button>
                                    }
                                    triggerIcon={
                                        active ? 'caret-top' : 'caret-bottom'
                                    }
                                >
                                    <TaskStatusDropdownItemList
                                        items={taskItems}/>
                                </DropDown>
                            </Button.Group>
                        )}
					</span>
                </div>
            ) : null}
        </>
    );
}

export default TaskStatusDropdown;
