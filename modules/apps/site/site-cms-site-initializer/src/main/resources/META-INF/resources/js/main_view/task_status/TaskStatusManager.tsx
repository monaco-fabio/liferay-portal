/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';

import '../../../css/components/AssetTaskStatus.scss';

import {
    ActionId, BulkActionDataDTO,
    IBulkActionSelectedData,
    IBulkActionTaskItem,
} from './TaskStatusType';
import {sub} from 'frontend-js-web';
import TaskStatusDropdown from "./components/TaskStatusDropdown";
import BulkActionService from "./services/BulkActionService";
import {START_TASK} from "../../common/utils/events";
import handleMessageAndName from "./util/HandleMessageAndName";
import generateUrlParams from "./util/GenerateUrlParams";

function TaskStatusManager() {
    const [active, setActive] = useState<boolean>(false);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(
        null);
    const updateOpenDropdownRef = useRef(false);
    const [isVisible, setIsVisible] = useState(false);
    const [processingTasks, setProcessingTask] = useState(0);
    const [taskItems, setTaskItems] = useState<IBulkActionTaskItem[]>([]);

    const getTaskItems = useCallback(async () => {
        const tasks = await BulkActionService.getTasks(
            {
                pageSize: 5,
                sort: "dateCreated:desc",
            }
        );

        setTaskItems(tasks?.items || []);
    }, []);

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const retryStrategy = useCallback(() => {
        const TIMEOUT = 10000;

        if (intervalRef.current) {
            return;
        }

        const pollingTasks = async () => {
            try {
                const tasks = await BulkActionService.getTasks(
                    {filter: `executionStatus eq 'STARTED'`}
                );

                if (tasks?.totalCount === 0) {
                    stopPolling();
                }

                if (updateOpenDropdownRef.current) {
                    getTaskItems();
                }
                setProcessingTask(tasks?.totalCount || 0);
            }
            catch {
                stopPolling();
            }
        };

        pollingTasks();
        intervalRef.current = setInterval(pollingTasks, TIMEOUT);
    }, [getTaskItems, stopPolling]);

    const postBulkAction = useCallback(
        async ({actionId, data, selectedData, ...otherProps}:
               {
                   actionId: ActionId,
                   data: BulkActionDataDTO,
                   otherProps: any,
                   selectedData: IBulkActionSelectedData,
               }
        ) => {
            const urlParams = generateUrlParams(selectedData, otherProps);

            try {
                const response = await BulkActionService.createTask(
                    actionId, selectedData, data, urlParams
                );

                const {infoMessage} = handleMessageAndName(
                    actionId, selectedData);

                if (response.data) {
                    Liferay.Util.openToast({
                        message: sub(
                            infoMessage,
                            [
                                selectedData.items.length,
                                ""
                            ]
                        ),
                        type: 'info'
                    });

                    retryStrategy();
                }

                if (response.error) {
                    Liferay.Util.openToast({
                        message: Liferay.Language.get(
                            'an-unexpected-system-error-occurred'
                        ),
                        type: 'danger',
                    });
                }
            }
            catch {
                Liferay.Util.openToast({
                    message: Liferay.Language.get(
                        'an-unexpected-system-error-occurred'
                    ),
                    type: 'danger',
                });
            }
        }, [retryStrategy]);

    useEffect(() => {
        retryStrategy();
        Liferay.on(START_TASK, postBulkAction);

        return () => {
            Liferay.detach(START_TASK, postBulkAction);
            stopPolling();
        };
    }, [postBulkAction, stopPolling]);

   useEffect(() => {
        if(taskItems.length || processingTasks > 0) {
            setIsVisible(true);
        }
    }, [processingTasks, setIsVisible, taskItems]);

    useEffect(() => {
        if (active) {
            updateOpenDropdownRef.current = active;
        }
    }, [active]);

    return (
        <TaskStatusDropdown
            active={active}
            dropdownActive={updateOpenDropdownRef}
            getTaskItems={getTaskItems}
            isVisible={isVisible}
            processingTasks={processingTasks}
            setActive={setActive}
            setIsVisible={setIsVisible}
            taskItems={taskItems}
        />
    );
}

export default TaskStatusManager;
