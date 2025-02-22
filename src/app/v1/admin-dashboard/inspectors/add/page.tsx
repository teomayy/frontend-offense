import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { AddInspectorPage } from './AddInspectorPage'

export const metadata: Metadata = {
	title: 'Добавление инспектора',
	...NO_INDEX_PAGE
}

export default function AddInspector() {
	return (
		<div>
			<AddInspectorPage />
		</div>
	)
}
