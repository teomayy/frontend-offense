import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'

export function Pagination() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	return (
		<div className='p-3 flex justify-between'>
			<button className='py-1 px-3 cursor-pointer'>
				{t.inspectors.previous}
			</button>
			<button className='py-1 px-3 cursor-pointer'>{t.inspectors.next}</button>
		</div>
	)
}
