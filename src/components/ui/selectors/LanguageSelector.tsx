import { Listbox, Transition } from '@headlessui/react'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useLanguageStore } from '@/store/useLanguageStore'

import { Locales } from '@/locales/locale'

const languages = [
	{ id: Locales.RU, name: 'Русский' },
	{ id: Locales.UZ, name: 'O‘zbekcha' }
]

export function LanguageSelector() {
	const { locale, setLocale } = useLanguageStore()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<Listbox
			value={locale}
			onChange={setLocale}
		>
			{({ open }) => (
				<div className='relative'>
					<Listbox.Button className='flex items-center gap-2 text-gray-900 dark:text-gray-50'>
						<Globe className='size-5' />
						<span>{languages.find(lang => lang.id === locale)?.name}</span>
					</Listbox.Button>
					<Transition
						show={open}
						enter='transition ease-out duration-100'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='absolute z-50 top-full right-0 bg-white rounded-lg shadow-lg w-36 p-1 text-sm dark:bg-sidebar mt-2'>
							{languages.map(lang => (
								<Listbox.Option
									key={lang.id}
									value={lang.id}
									className={({ active }) =>
										`cursor-pointer py-2 pl-3 pr-9 ${
											active
												? 'bg-gray-600/10 dark:bg-gray-600/30 text-purple-600 dark:text-purple-300'
												: 'text-gray-900 dark:text-gray-50'
										}`
									}
								>
									{lang.name}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	)
}
