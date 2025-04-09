import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import FineLogsPage from './logs'

export const metadata: Metadata = {
	title: 'Логи',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<FineLogsPage />
		</div>
	)
}
