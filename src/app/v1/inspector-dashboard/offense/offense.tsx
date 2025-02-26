'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { Search } from '@/components/ui/search/Search'

import { IFinesResponse } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { inspectorService } from '@/services/inspector.service'

export function Offense() {
	const [searchTerm, setSearchTerm] = useState('')
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const queryClient = useQueryClient()

	const {
		data: fines,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['fines'],
		queryFn: () => inspectorService.getFines(),
		staleTime: 5 * 60 * 1000
	})

	const deleteFineMutation = useMutation({
		mutationFn: (id: string) => inspectorService.deleteFine(id),
		onSuccess() {
			toast.success(t.offense.deleted)
			refetch()
			queryClient.invalidateQueries({ queryKey: ['fines'] })
		}
	})

	const filteredFines = fines?.filter((fine: { name: string }) =>
		fine.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
			<div className='flex items-center justify-between'>
				<Search placeholder={t.offense.search} />
				<Link href='offense/add-type'>
					<button className='p-3 bg-[#605bca] dark:text-white hover:bg-[#6b65d1] text-white  border-none rounded-md cursor-pointer'>
						{' '}
						{t.offense.addTypeOffense}
					</button>
				</Link>
				<Link href='offense/add'>
					<button className='p-3 bg-[#605bca] dark:text-white hover:bg-[#6b65d1] text-white border-none rounded-md cursor-pointer'>
						{' '}
						{t.offense.addOffense}
					</button>
				</Link>
			</div>
			<table className='w-full mt-5'>
				<thead>
					<tr>
						<th className='p-3 text-left'>{t.offense.name}</th>
						<th className='p-3 text-left'>{t.offense.date}</th>
						<th className='p-3 text-left'>{t.offense.amount}</th>
						<th className='p-3 text-left'>{t.offense.status}</th>
						<th className='p-3 text-left'>{t.offense.action}</th>
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
					) : filteredFines?.length ? (
						filteredFines?.map((fine: IFinesResponse) => (
							<tr
								key={fine.id}
								className='border-t border-gray-700 dark:hover:bg-gray-700 hover:bg-[#877bd3] rounded-md'
							>
								<td className='p-3'>{fine.name}</td>
								<td className='p-3'>
									{new Date(fine.issuedAt).toLocaleDateString('ru-RU')}
								</td>
								<td className='p-3'>{fine.amount} сум</td>
								<td className='p-3'>
									<span
										className={`px-2 py-1 rounded text-white ${
											fine.status === 'pending'
												? 'bg-[#f7cb7375]'
												: fine.status === 'paid'
													? 'bg-[#5D8736]'
													: 'bg-[#BE3144]'
										}`}
									>
										{fine.status === 'pending'
											? t.offense.pending
											: fine.status === 'paid'
												? t.statistics.paidTransaction
												: t.statistics.deletedTransaction}
									</span>
								</td>
								<td className='p-3'>
									<button
										onClick={() => deleteFineMutation.mutate(fine.id)}
										className='py-1 px-3 bg-[#BE3144] text-white rounded-md cursor-pointer'
										disabled={deleteFineMutation.isPending}
									>
										{t.offense.deleting}
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={4}
								className='text-center p-3'
							>
								Штрафов не найдено
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
