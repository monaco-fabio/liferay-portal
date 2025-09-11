/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';

import '../../../css/components/AssetTaskStatus.scss';

import {
    IBulkActionSelectedData,
    IBulkActionTaskItem,
} from './TaskStatusType';
import {START_TASK} from '../../common/utils/events';
import {sub} from 'frontend-js-web';
import TaskStatusDropdown from "./components/TaskStatusDropdown";
import {BULK_ACTION_TYPE} from "./util";
import BulkActionService from "./services/BulkActionService";

function TaskStatusManager() {
    const [active, setActive] = useState(false);
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

        const poller = async () => {
            try {
                const tasks=  await BulkActionService.getTasks(
                    {
                        filter: `executionStatus eq 'STARTED'`
                    }
                );

                if (tasks?.totalCount === 0) {
                    stopPolling();
                }

                if (updateOpenDropdownRef.current) {
                    getTaskItems();
                }
                setProcessingTask(tasks?.totalCount || 0);
            }
            catch (error) {
                stopPolling();
            }
        };

        poller();
        intervalRef.current = setInterval(poller, TIMEOUT);
    }, [getTaskItems, stopPolling]);

    const postBulkAction = useCallback(
        async ({actionId, selectedData}:
               {
                   actionId: string,
                   selectedData: IBulkActionSelectedData
               }
        ) => {
            const action = BULK_ACTION_TYPE[actionId];

            const body = {
                bulkActionItems: selectedData.items.map((item: any) => ({
                    classExternalReferenceCode:
                    item.embedded.externalReferenceCode,
                    className: item.entryClassName,
                    classPK: item.embedded.id,
                    name: item.embedded.title,
                })),
                selectAll: selectedData.selectAll,
                type: actionId,
            };

            const response = await BulkActionService.createTask(
                body
            );

            if (response.data) {
                Liferay.Util.openToast({
                    message: sub(
                        Liferay.Language.get('x-x-items'),
                        [selectedData.items.length]
                    ),
                    type: 'info'
                });
            }

            if (response.error) {
                Liferay.Util.openToast({
                    message: Liferay.Language.get(
                        'an-unexpected-system-error-occurred'
                    ),
                    type: 'danger',
                });
            }

            retryStrategy();
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
        if (processingTasks > 0) {
            setIsVisible(true);
        }
    }, [processingTasks, setIsVisible]);

    useEffect(() => {
        updateOpenDropdownRef.current = active;
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
