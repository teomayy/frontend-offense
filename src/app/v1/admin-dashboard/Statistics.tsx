'use client'

import { useQuery } from '@tanstack/react-query'

import { Card } from '@/components/admin-dashboard-layout/card/card'
import { STAT } from '@/components/admin-dashboard-layout/card/stat.data'
import { Chart } from '@/components/admin-dashboard-layout/chart/chart'
import { RightBar } from '@/components/admin-dashboard-layout/rightbar/rightbar'
import { Transactions } from '@/components/admin-dashboard-layout/transactions/transactions'

import { adminService } from '@/services/admin.service'

export function Statistics() {
	const { data: stats, isPending } = useQuery({
		queryKey: ['adminStats'],
		queryFn: adminService.getStatistics.bind(adminService)
	})

	const updatedStats = STAT.map(stat => ({
		...stat,
		value: stats?.[stat.label] ?? 0
	}))

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
