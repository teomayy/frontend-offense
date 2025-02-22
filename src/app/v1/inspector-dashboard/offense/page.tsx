import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Offense } from './offense'

export const metadata: Metadata = {
	title: 'Штрафы',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Offense />
}
