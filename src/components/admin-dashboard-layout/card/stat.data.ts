import { Archive, FileText, UserCircle } from 'lucide-react'

import { IStat } from './stat.interface'

export const STAT: IStat[] = [
	{
		icon: UserCircle,
		label: 'Всего инспекторов',
		value: 0
	},
	{
		icon: FileText,
		label: 'Активные штрафы',
		value: 0 // Динамическое значение
	},
	{
		icon: Archive,
		label: 'Архивные штрафы',
		value: 0 // Динамическое значение
	}
]
