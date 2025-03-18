'use client'

import { Bell, MessageSquareMore } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Heading } from '@/components/ui/Heading'
import DarkModeSelector from '@/components/ui/selectors/DarkModeSelector'
import { LanguageSelector } from '@/components/ui/selectors/LanguageSelector'

import { useLanguageStore } from '@/store/useLanguageStore'

import { Profile } from '../sidebar/profile/Profile'

import { translation } from '@/locales/locale'

export function Header() {
	const [isMobile, setIsMobile] = useState(false)
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const pathname = usePathname()

	const getTitle = () => {
		if (pathname.includes('/admin-dashboard/inspectors'))
			return t.statistics.inspectors
		if (pathname.includes('/admin-dashboard/fines')) return t.menu.offenses
		if (pathname.includes('/admin-dashboard/settings')) return t.menu.settings
		return t.menu.stat // По умолчанию
	}

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	if (isMobile) {
		return (
			<header className='fixed top-0  flex justify-between p-5 rounded-xl dark:bg-sidebar items-center bg-[#A294F9] z-50 pt-[env(safe-area-inset-top,0)]'>
				<Heading title={getTitle()} />
				<div className='flex items-center gap-5 justify-between'>
					<div className='flex items-center gap-3 dark:bg-[#2e374a] bg-[#CDC1FF] md:p-3 p-1 rounded-xl md:hidden'>
						<Profile />
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

	return (
		<header className='flex justify-between p-5 rounded-xl dark:bg-sidebar items-center bg-[#A294F9]'>
			<Heading title={getTitle()} />
			<div className='flex items-center gap-5 justify-between'>
				<div className='flex items-center gap-3 dark:bg-[#2e374a] bg-[#CDC1FF] md:p-3 p-1 rounded-xl md:hidden'>
					<Profile />
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
