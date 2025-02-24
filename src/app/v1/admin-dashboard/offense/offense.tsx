'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { Search } from '@/components/ui/search/Search'

import { IFinesResponse } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export function Offense() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { data: fines, isLoading } = useQuery({
		queryKey: ['fines'],
		queryFn: () => adminService.getFines(),
		staleTime: 5 * 60 * 1000
	})

	const deleteFineMutation = useMutation({
		mutationFn: (id: string) => adminService.deleteFine(id),
		onSuccess() {
			toast.success('Штраф удалён!')
			queryClient.invalidateQueries({ queryKey: ['fines'] })
		},
		onError(error) {
			console.error('Ошибка при удалении штрафа:', error)
			toast.error('Не удалось удалить штраф')
		}
	})

	const handleDelete = (id: string) => {
		if (confirm('Вы уверены, что хотите удалить штраф?')) {
			deleteFineMutation.mutate(id)
		}
	}

	const filteredFines = fines?.filter((fine: { name: string }) =>
		fine.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
			<div className='flex items-center justify-between'>
				<Search placeholder={t.offense.search} />
			</div>
			<table className='w-full mt-5'>
				<thead>
					<tr>
						<th className='p-3 text-left'>{t.offense.name}</th>
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
								className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'
							>
								<td className='p-3'>{fine.name}</td>
								<td className='p-3'>{fine.amount} сум</td>
								<td className='p-3'>
									<span
										className={`px-2 py-1 rounded text-white ${
											fine.status === 'pending'
												? 'bg-yellow-500'
												: fine.status === 'paid'
													? 'bg-green-500'
													: 'bg-red-500'
										}`}
									>
										{fine.status === 'pending'
											? t.offense.pending
											: fine.status === 'paid'
												? t.offense.paid
												: t.offense.deleted}
									</span>
								</td>
								<td className='p-3'>
									<button
										onClick={() => handleDelete(fine.id)}
										className='py-1 px-3 bg-red-500 text-white rounded-md cursor-pointer'
										disabled={deleteFineMutation.isPending}
									>
										{deleteFineMutation.isPending
											? t.offense.pendingDeleting
											: t.offense.deleting}
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
