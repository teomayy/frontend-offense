import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { IFineType } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { Search } from './search/Search'
import { translation } from '@/locales/locale'
import { inspectorService } from '@/services/inspector.service'

export function FineTypesTable() {
	const [searchTerm, setSearchTerm] = useState('')
	const queryClient = useQueryClient()
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const { data: fineTypes, isLoading } = useQuery({
		queryKey: ['fineTypes'],
		queryFn: () => inspectorService.getFineTypes(),
		staleTime: 5 * 60 * 1000
	})

	const deleteFineTypeMutation = useMutation({
		mutationFn: (id: string) => inspectorService.deleteFineType(id),
		onSuccess() {
			toast.success('Тип штрафа удалён!')
			queryClient.invalidateQueries({ queryKey: ['fineTypes'] })
		},
		onError(error) {
			console.error('Ошибка удаления типа штрафа:', error)
			toast.error('Не удалось удалить тип штрафа')
		}
	})

	const handleDelete = (id: string) => {
		if (confirm('Вы уверены, что хотите удалить этот тип штрафа?')) {
			deleteFineTypeMutation.mutate(id)
		}
	}

	const filteredFineTypes = fineTypes?.filter((type: IFineType) =>
		type.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
			<div className='flex items-center justify-between mb-4'>
				<Search />
			</div>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-gray-700'>
						<th className='p-3 text-left'>{t.TableOffenseTypes.name}</th>
						<th className='p-3 text-left'>{t.TableOffenseTypes.percentage}</th>
						<th className='p-3 text-left'>{t.TableOffenseTypes.fixedAmount}</th>
						<th className='p-3 text-left'>{t.TableOffenseTypes.action}</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td
								colSpan={4}
								className='text-center p-3'
							>
								{t.TableOffenseTypes.loading}
							</td>
						</tr>
					) : filteredFineTypes?.length ? (
						filteredFineTypes.map((type: IFineType) => (
							<tr
								key={type.id}
								className='border-b border-gray-700 hover:bg-[#877bd3]'
							>
								<td className='p-3'>{type.name}</td>
								<td className='p-3'>
									{type.percentage ? `${type.percentage}%` : '—'}
								</td>
								<td className='p-3'>
									{type.fixedAmount
										? `${type.fixedAmount.toLocaleString()} сум`
										: '—'}
								</td>
								<td className='p-3'>
									<button
										onClick={() => handleDelete(type.id)}
										className='py-1 px-3 bg-[#BE3144] text-white rounded-md cursor-pointer'
										disabled={deleteFineTypeMutation.isPending}
									>
										{deleteFineTypeMutation.isPending
											? 'Удаление...'
											: t.TableOffenseTypes.delete}
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
								Типы штрафов не найдены
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
