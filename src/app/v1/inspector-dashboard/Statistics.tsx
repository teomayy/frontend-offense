'use client'

import { useQuery } from '@tanstack/react-query'
import { CreditCard, HandCoins, User } from 'lucide-react'
import { useMemo } from 'react'

import { Card } from '@/components/inspector-dashboard-layout/card/card'
import { Chart } from '@/components/inspector-dashboard-layout/chart/chart'
import { RightBar } from '@/components/inspector-dashboard-layout/rightbar/rightbar'
import { Transactions } from '@/components/inspector-dashboard-layout/transactions/transactions'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'
import { inspectorService } from '@/services/inspector.service'

export function Statistics() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const { data: inspectorStats, isPending } = useQuery({
		queryKey: ['inspectorStats'],
		queryFn: inspectorService.getInspectorStats.bind(adminService)
	})

	const updatedStats = useMemo(() => {
		return [
			{
				icon: User,
				label: t.statistics.offense,
				value: inspectorStats?.totalFines || 0
			},
			{
				icon: CreditCard,
				label: t.statistics['paid-offenses'],
				value: inspectorStats?.paidFines || 0
			},
			{
				icon: HandCoins,
				label: t.statistics.pending,
				value: inspectorStats?.pendingFines || 0
			}
		]
	}, [inspectorStats, t])

	if (isPending) {
		return <p className='text-center text-gray-500'>Загрузка статистики...</p>
	}

	return (
		<div className='grid xl:grid-cols-4 gap-5 mt-5'>
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
