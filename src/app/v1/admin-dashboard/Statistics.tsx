'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CreditCard, HandCoins, User } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import { Card } from '@/components/admin-dashboard-layout/card/card'
import { Chart } from '@/components/admin-dashboard-layout/chart/chart'
import { RightBar } from '@/components/admin-dashboard-layout/rightbar/rightbar'
import { Transactions } from '@/components/admin-dashboard-layout/transactions/transactions'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export function Statistics() {
	const { locale } = useLanguageStore()
	const queryClient = useQueryClient()

	// 🔄 Обновляем статистику при смене языка
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['adminStats'] })
	}, [locale])

	// 📝 Достаем перевод
	const t = useMemo(() => translation[locale], [locale])

	// 📊 Получаем статистику
	const { data: stats, isPending } = useQuery({
		queryKey: ['adminStats'],
		queryFn: adminService.getStatistics.bind(adminService)
	})

	// 🔥 Формируем карточки статистики
	const updatedStats = useMemo(() => {
		return [
			{
				icon: User,
				label: t.statistics.inspectors,
				value: stats?.inspectorCount || 0
			},
			{
				icon: CreditCard,
				label: t.statistics.activeFines,
				value: stats?.activeFinesCount || 0
			},
			{
				icon: HandCoins,
				label: t.statistics.archivedFines,
				value: stats?.pendingFines || 0
			}
		]
	}, [stats, t])

	if (isPending) {
		return <p className='text-center text-gray-500'>Загрузка статистики...</p>
	}

	return (
		<div className='grid grid-cols-4 gap-5 mt-5'>
			<div className='col-span-3 flex flex-col gap-5 '>
				<div className='grid grid-cols-3 gap-5'>
					{updatedStats.map((item, index) => (
						<Card
							key={index}
							item={item}
						/>
					))}
				</div>
				<div className=''>
					<Transactions />
					<Chart />
				</div>
			</div>
			<div className='col-span-1'>
				<RightBar />
			</div>
		</div>
	)
}
