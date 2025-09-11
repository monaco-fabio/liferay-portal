/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {
    IBulkActionTasks,
} from "../TaskStatusType";
import ApiHelper, {RequestResult} from "../../../common/services/ApiHelper";

const BULK_ACTION_URL = `/o/headless-cms/v1.0/bulk-action`;
const BULK_ACTION_TASKS_URL = `/o/cms/bulk-action-tasks`;

export type bulkAction = {
    bulkActionItems: {
        classExternalReferenceCode: any;
        className: any;
        classPK: any;
        name: any
    }[];
    selectAll: boolean;
    type: any
}

async function createTask(items: bulkAction)
:Promise<RequestResult<IBulkActionTasks>>{
    return  await ApiHelper.post<IBulkActionTasks>(
        `${BULK_ACTION_URL}`,
        items,
    );
}

async function getTasks({
    filter = '',
    pageSize = -1,
    sort = '',
}: {
    filter?: string;
    pageSize?: number;
    sort?: string;
}): Promise<null | IBulkActionTasks> {
    const url = new URL(`${Liferay.ThemeDisplay.getPortalURL()}${BULK_ACTION_TASKS_URL}`);

    Object.entries({filter, pageSize, sort}).map(([key, value]) => {
        if (value) {
            url.searchParams.append(key, value as string);
        }
    });

    const {data: tasks} = await ApiHelper.get<IBulkActionTasks>(url.toString());

    return tasks;
}

export default {
    createTask,
    getTasks,
}