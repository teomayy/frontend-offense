import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { AddFineTypePage } from './AddTypeOffensePage'

export const metadata: Metadata = {
	title: 'Добавление штрафа',
	...NO_INDEX_PAGE
}

export default function AddOffense() {
	return (
		<div>
			<AddFineTypePage />
		</div>
	)
}
