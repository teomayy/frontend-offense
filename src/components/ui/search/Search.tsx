import { SearchIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'

interface SearchProps {
	placeholder?: string
	onSearch?: (value: string) => void
}

export function Search({ onSearch }: SearchProps) {
	const [query, setQuery] = useState('')
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const placeholder = t.TableOffenseTypes.search

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setQuery(value)
		if (onSearch) onSearch(value)
	}

	return (
		<div className='flex items-center gap-3 dark:bg-[#2e374a] bg-[#CDC1FF] p-3 rounded-xl w-max  '>
			<SearchIcon />
			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder={placeholder}
				className='bg-transparent w-full border-none outline-none'
			/>
		</div>
	)
}
