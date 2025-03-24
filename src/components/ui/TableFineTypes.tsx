import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'
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

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)

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

	const openModal = (id: string) => {
		setSelectedTypeId(id)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setSelectedTypeId(null)
		setIsModalOpen(false)
	}

	const confirmDelete = () => {
		if (selectedTypeId) {
			deleteFineTypeMutation.mutate(selectedTypeId)
			closeModal()
		}
	}

	const filteredFineTypes = fineTypes?.filter((type: IFineType) =>
		type.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<>
			<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
				<div className='flex items-center justify-between mb-4'>
					<Search onSearch={value => setSearchTerm(value)} />
				</div>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='border-b border-gray-700'>
							<th className='p-3 text-left md:text-xs text-[9px]'>
								{t.TableOffenseTypes.name}
							</th>
							<th className='p-3 text-left md:text-xs text-[9px]'>
								{t.TableOffenseTypes.percentage}
							</th>
							<th className='p-3 text-left md:text-xs text-[9px]'>
								{t.TableOffenseTypes.fixedAmount}
							</th>
							<th className='p-3 text-left md:text-xs text-[9px]'>
								{t.TableOffenseTypes.action}
							</th>
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
									<td className='p-3 md:text-xs text-[9px]'>{type.name}</td>
									<td className='p-3 md:text-xs text-[9px]'>
										{type.percentage ? `${type.percentage}%` : '—'}
									</td>
									<td className='p-3 md:text-xs text-[9px]'>
										{type.fixedAmount
											? `${type.fixedAmount.toLocaleString()} сум`
											: '—'}
									</td>
									<td className='p-3 md:text-xs text-[9px]'>
										<button
											onClick={() => openModal(type.id)}
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

			{isModalOpen &&
				createPortal(
					<div className='fixed inset-0 flex items-center justify-center bg-sidebar bg-opacity-50'>
						<div className='bg-[#605bca] flex flex-col dark:bg-sidebar p-6 rounded-lg shadow-lg justify-center'>
							<div className='flex justify-center mb-2'>
								<h2 className='text-lg font-semibold text-white dark:text-gray-100 '>
									{t.offense.deleting}
								</h2>
							</div>
							<p className='text-gray-600 dark:text-gray-300'>
								{t.offense.deleteMessage}
							</p>
							<div className='mt-4 flex justify-around'>
								<button
									onClick={confirmDelete}
									className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
								>
									{t.offense.deleting}
								</button>
								<button
									onClick={closeModal}
									className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
								>
									{t.offense.cancel}
								</button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</>
	)
}
