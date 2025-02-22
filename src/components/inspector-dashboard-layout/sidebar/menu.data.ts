import { ClipboardList, LayoutDashboard, Settings } from 'lucide-react'

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
			link: DASHBOARD_PAGES.HOME_INSPECTOR,
			name: t.menu.home
		},
		{
			icon: ClipboardList,
			link: DASHBOARD_PAGES.INSPECTOR_OFFENSE,
			name: t.menu.offenses
		},
		{
			icon: Settings,
			link: DASHBOARD_PAGES.SETTINGS_INSPECTOR,
			name: t.menu.settings
		}
	]
}
