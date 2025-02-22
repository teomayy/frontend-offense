'use client'

import { Listbox, Transition } from '@headlessui/react'
import { ComputerIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeOption = {
	id: string
	name: string
	icon: React.ReactNode
}

const themeOptions: ThemeOption[] = [
	{ id: 'light', name: 'Light', icon: <Sun className='size-5' /> },
	{ id: 'dark', name: 'Dark', icon: <Moon className='size-5' /> },
	{ id: 'system', name: 'System', icon: <ComputerIcon className='size-5' /> }
]

export default function DarkModeSelector() {
	const { theme, setTheme, systemTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Определяем текущую тему
	const currentTheme = theme === 'system' ? systemTheme : theme

	// Устанавливаем `mounted` после монтирования компонента
	useEffect(() => {
		setMounted(true)
	}, [])

	// Если компонент еще не смонтирован — не рендерим UI
	if (!mounted) return null

	return (
		<Listbox
			value={currentTheme}
			onChange={setTheme}
		>
			{({ open }) => (
				<div className='relative'>
					<Listbox.Button className='flex items-center'>
						{currentTheme === 'dark' ? (
							<Moon
								className='size-5 text-gray-50'
								aria-hidden='true'
							/>
						) : (
							<Sun
								className='size-5 text-gray-900'
								aria-hidden='true'
							/>
						)}
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
						<Listbox.Options className='absolute z-50 top-full right-0 bg-white rounded-lg shadow-lg w-36 py-1 text-sm dark:bg-sidebar mt-2'>
							{themeOptions.map(themeOption => (
								<Listbox.Option
									key={themeOption.id}
									value={themeOption.id}
									className={({ active }) =>
										`cursor-pointer py-2 pl-3 pr-9 flex items-center gap-2 ${
											active
												? 'bg-gray-600/10 dark:bg-gray-600/30 text-purple-600 dark:text-purple-300'
												: 'text-gray-900 dark:text-gray-50'
										}`
									}
								>
									{themeOption.icon}
									<span className='ml-2'>{themeOption.name}</span>
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	)
}
