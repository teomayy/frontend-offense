import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { EditInspectorPage } from './EditInspectorPage'

export const metadata: Metadata = {
	title: 'Редактирования',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<EditInspectorPage />
		</div>
	)
}
