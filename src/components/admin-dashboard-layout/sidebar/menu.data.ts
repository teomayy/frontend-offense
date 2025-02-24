import { ClipboardList, LayoutDashboard, Settings, User } from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useLanguageStore } from '@/store/useLanguageStore'

import { IMenuItem } from './menu.interface'
import { translation } from '@/locales/locale'

export function MENU(): IMenuItem[] {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	return [
		{
			icon: LayoutDashboard,
			link: DASHBOARD_PAGES.HOME_ADMIN,
			name: t.menu.home
		},
		{
			icon: User,
			link: DASHBOARD_PAGES.INSPECTORS,
			name: t.menu.inspectors
		},
		{
			icon: ClipboardList,
			link: DASHBOARD_PAGES.ADMIN_OFFENSE,
			name: t.menu.offenses
		},
		{
			icon: Settings,
			link: DASHBOARD_PAGES.SETTINGS_ADMIN,
			name: t.menu.settings
		}
	]
}
