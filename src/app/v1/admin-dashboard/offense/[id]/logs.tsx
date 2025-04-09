import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

interface FineLog {
	id: string
	amount: number
	status: 'pending' | 'paid' | 'deleted'
	createdAt: string
}

export default function FineLogsPage() {
	const { id } = useParams() as { id: string }
	const router = useRouter()

	const { locale } = useLanguageStore()
	const t = translation[locale]

	const { data: logs, isLoading } = useQuery<FineLog[]>({
		queryKey: ['finelogs', id],
		queryFn: async () => await adminService.getFineLogs(id),
		enabled: !!id
	})

	if (isLoading) return <div>{t.TableOffenseTypes.loading}</div>
	if (!logs?.length)
		return (
			<div className='mt-4 flex w-1/2 justify-between'>
				<button
					onClick={() => router.back()}
					className='mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
				>
					{t.offense.back}
				</button>
				<div className='flex items-center'>{t.offense.historyNotFound}</div>
			</div>
		)

	return (
		<div className='p-4'>
			<button
				onClick={() => router.back}
				className='mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
			>
				← {t.offense.back}
			</button>
			<h1 className='text-xl font-bold mb-4'>{t.offense.historyTitle}</h1>
			<table className='w-full border'>
				<thead>
					<tr>
						<th className='p-2 border'>{t.offense.amount}</th>
						<th className='p-2 border'>{t.offense.status}</th>
						<th className='p-2 border'>{t.offense.dateLog}</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((log: FineLog) => (
						<tr key={log.id}>
							<td className='p-2 border'>{log.amount} сум</td>
							<td className='p-2 border'>
								{log.status === 'pending'
									? t.offense.pending
									: log.status === 'paid'
										? t.offense.paid
										: t.statistics.deletedTransaction}
							</td>
							<td className='p-2 border'>
								{new Date(log.createdAt).toLocaleString('ru-RU')}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
