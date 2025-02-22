'use client'

import { Bell, MessageSquareMore, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Heading } from '@/components/ui/Heading'
import DarkModeSelector from '@/components/ui/selectors/DarkModeSelector'
import { LanguageSelector } from '@/components/ui/selectors/LanguageSelector'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'

export function Header() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const pathname = usePathname()

	const getTitle = () => {
		if (pathname.includes('/inspector-dashboard/offense'))
			return t.menu.offenses
		if (pathname.includes('/inspector-dashboard/settings'))
			return t.menu.settings
		return t.menu.stat // По умолчанию
	}

	return (
		<header className='flex justify-between p-5 rounded-xl dark:bg-sidebar items-center bg-[#A294F9]'>
			<Heading title={getTitle()} />
			<div className='flex items-center gap-5'>
				<div className='flex items-center gap-3 dark:bg-[#2e374a] bg-[#CDC1FF] p-3 rounded-xl'>
					<Search />
					<input
						className='bg-transparent  border-transparent outline-none'
						type='text'
						placeholder='Поиск...'
					/>
				</div>
				<div className='flex gap-5 items-center'>
					<MessageSquareMore size={20} />
					<Bell size={20} />
					<LanguageSelector />
					<DarkModeSelector />
				</div>
			</div>
		</header>
	)
}
