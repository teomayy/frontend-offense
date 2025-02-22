import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { AddOffensePage } from './AddOffensePage'

export const metadata: Metadata = {
	title: 'Добавление штрафа',
	...NO_INDEX_PAGE
}

export default function AddOffense() {
	return (
		<div>
			<AddOffensePage />
		</div>
	)
}
