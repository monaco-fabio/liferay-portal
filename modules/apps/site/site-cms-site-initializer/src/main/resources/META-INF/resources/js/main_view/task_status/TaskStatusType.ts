/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import LoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

export interface IBulkActionSelectedData {
	items: IBulkActionSelectedDataItem[];
	keywords?: string;
	objectEntryFolderId?: number;
	permission?: [{
		actionIds: string;
		roleExternalReferenceCode: string;
		roleName: string;
		roleType: string;
	}]
	selectAll: boolean;
	status?: number;
	taxonomyCategoryIds?: [];
	type: string;
}

export interface IBulkActionSelectedDataItem {
	classExternalReferenceCode: string;
	className: string;
	classPK: number;
	name: string;
}

export interface IBulkActionTasks {
	actions: {};
	items: IBulkActionTaskItem[];
	lastPage: number;
	page: number;
	pageSize: number;
	totalCount: number;
}

export interface IBulkActionTaskItem {
	actionName: string;
	dateCreated: string;
	dateModified: string;
	executionStatus: string;
	id: number;
	numberOfItems: number;
	taskResult: string;
	totalCount: number;
}

export const COMPLETED = 'COMPLETED';
export const FAILED = 'FAILED';
export const STARTED = 'STARTED';

export const STATUS_PROPERTIES: Record<string, TStatusProperties> = {
	[COMPLETED]: {
		component: ClayIcon,
		icon: 'check-circle-full',
		iconClassName: 'text-success',
		label: 'completed',
		labelDisplayType: 'success',
	},
	[FAILED]: {
		component: ClayIcon,
		icon: 'times-circle-full',
		iconClassName: 'text-danger',
		label: 'failed',
		labelDisplayType: 'danger',
	},
	[STARTED]: {
		component: LoadingIndicator,
		displayType: 'primary',
		iconClassName: 'loading-animation',
		label: 'processing',
		labelDisplayType: 'info',
	},
};

export type TStatusProperties = {
	component: React.ComponentType<any>;
	displayType?: string;
	icon?: string;
	iconClassName: string;
	label: string;
	labelDisplayType: 'danger' | 'info' | 'success';
};
