import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Statistics } from './Statistics'

export const metadata: Metadata = {
	title: 'Админ панель',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Statistics />
		</div>
	)
}
