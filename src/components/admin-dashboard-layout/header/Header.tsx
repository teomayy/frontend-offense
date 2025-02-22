'use client'

import { Bell, Globe, MessageSquareMore, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Heading } from '@/components/ui/Heading'
import DarkModeSelector from '@/components/ui/selectors/DarkModeSelector'

export function Header() {
	const pathname = usePathname()

	const getTitle = () => {
		if (pathname.includes('/admin-dashboard/inspectors')) return 'ИНСПЕКТОРЫ'
		if (pathname.includes('/admin-dashboard/fines')) return 'ШТРАФЫ'
		if (pathname.includes('/admin-dashboard/settings')) return 'НАСТРОЙКИ'
		return 'СТАТИСТИКА' // По умолчанию
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
				<div className='flex gap-5'>
					<MessageSquareMore size={20} />
					<Bell size={20} />
					<Globe size={20} />
					<DarkModeSelector />
				</div>
			</div>
		</header>
	)
}
