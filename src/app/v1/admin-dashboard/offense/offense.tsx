'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { Search } from '@/components/ui/search/Search'

import { IFinesResponse } from '@/types/fines.types'

import { adminService } from '@/services/admin.service'

export function Offense() {
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
				<Search placeholder='Поиск продукт...' />
			</div>
			<table className='w-full mt-5'>
				<thead>
					<tr>
						<th className='p-3'>Называния</th>
						<th className='p-3'>Сумма</th>
						<th className='p-3'>Статус</th>
						<th className='p-3'>Действия</th>
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
											? 'Ожидает оплаты'
											: fine.status === 'paid'
												? 'Оплачен'
												: 'Удалён'}
									</span>
								</td>
								<td className='p-3'>
									<button
										onClick={() => handleDelete(fine.id)}
										className='py-1 px-3 bg-red-500 text-white rounded-md cursor-pointer'
										disabled={deleteFineMutation.isPending}
									>
										{deleteFineMutation.isPending ? 'Удаление...' : 'Удалить'}
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
