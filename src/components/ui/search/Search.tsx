import { SearchIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

interface SearchProps {
	placeholder?: string
	onSearch?: (value: string) => void
}

export function Search({ placeholder = 'Поиск...', onSearch }: SearchProps) {
	const [query, setQuery] = useState('')

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
