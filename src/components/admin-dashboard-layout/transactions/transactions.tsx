import { useQuery } from '@tanstack/react-query'

import { IFinesResponse } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export function Transactions() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const { data: transactions, isLoading } = useQuery({
		queryKey: ['transactions'],
		queryFn: () => adminService.getFines()
	})

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl'>
			<h2 className='font-extralight text-textSoft'>
				{t.statistics['last-transaction']}
			</h2>
			<table className='w-full'>
				<thead>
					<tr>
						<td className='p-3'>{t.statistics.name}</td>
						<td className='p-3'>{t.statistics.status}</td>
						<td className='p-3'>{t.statistics.date}</td>
						<td className='p-3'>{t.statistics.amount}</td>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td
								colSpan={4}
								className='text-center p-3'
							>
								Загрузка...
							</td>
						</tr>
					) : transactions?.length ? (
						transactions.map((transaction: IFinesResponse) => (
							<tr
								key={transaction.id}
								className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'
							>
								<td className='p-3'>{transaction.name}</td>
								<td className='p-4'>
									<span
										className={`rounded-md p-2 text-xs ${transaction.status === 'pending' ? 'bg-[#f7cb7375]' : transaction.status === 'paid' ? 'bg-teal-500' : 'bg-red-500'} text-white`}
									>
										{transaction.status === 'pending'
											? t.statistics.paidTransaction
											: transaction.status === 'paid'
												? t.statistics.paidTransaction
												: t.statistics.deletedTransaction}
									</span>
								</td>
								<td className='p-3'>
									{new Date(transaction.issuedAt).toLocaleString('RU')}
								</td>
								<td className='p-3'>
									{transaction.amount.toLocaleString()} сум
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={4}
								className='text-center p-3'
							>
								Нет активных штрафов
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
