'use client'

import { useQuery } from '@tanstack/react-query'
import { CreditCard, HandCoins, User } from 'lucide-react'
import { useMemo } from 'react'

import { Card } from '@/components/inspector-dashboard-layout/card/card'
import { Chart } from '@/components/inspector-dashboard-layout/chart/chart'
import { RightBar } from '@/components/inspector-dashboard-layout/rightbar/rightbar'
import { Transactions } from '@/components/inspector-dashboard-layout/transactions/transactions'

import { adminService } from '@/services/admin.service'
import { inspectorService } from '@/services/inspector.service'

export function Statistics() {
	const { data: inspectorStats, isPending } = useQuery({
		queryKey: ['adminStats'],
		queryFn: inspectorService.getInspectorStats.bind(adminService)
	})

	const updatedStats = useMemo(() => {
		return [
			{
				icon: User,
				label: 'Всего штрафов',
				value: inspectorStats?.totalFines || 0
			},
			{
				icon: CreditCard,
				label: 'Оплаченные штрафы',
				value: inspectorStats?.paidFines || 0
			},
			{
				icon: HandCoins,
				label: 'Ожидают оплаты',
				value: inspectorStats?.pendingFines || 0
			}
		]
	}, [inspectorStats])

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
