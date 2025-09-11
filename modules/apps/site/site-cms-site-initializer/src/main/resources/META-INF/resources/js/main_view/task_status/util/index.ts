/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export const DELETE = 'delete';
export const DOWNLOAD = 'download';
export const EXPORT = 'export';

export const BULK_ACTION_TYPE: Record<string, any> = {
    [DELETE]: {
        actionMessage: "deleting",
    },
    [DOWNLOAD]: {
        actionMessage: "download",
    },
    [EXPORT]: {
        actionMessage: "exporting",
    }
}