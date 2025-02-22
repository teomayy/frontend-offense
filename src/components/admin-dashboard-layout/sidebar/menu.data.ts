import { ClipboardList, LayoutDashboard, Settings, User } from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME_ADMIN,
		name: 'Панель управления'
	},
	{
		icon: User,
		link: DASHBOARD_PAGES.INSPECTORS,
		name: 'Инспекторы'
	},
	{
		icon: ClipboardList,
		link: DASHBOARD_PAGES.ADMIN_OFFENSE,
		name: 'Штрафы'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS_ADMIN,
		name: 'Настройки'
	}
]
