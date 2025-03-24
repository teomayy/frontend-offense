'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'

import { Search } from '@/components/ui/search/Search'

import { IFinesResponse } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export function Offense() {
	const { locale } = useLanguageStore()
	const t = translation[locale]
	const [statusFilter, setStatusFilter] = useState('')
	const [inspectorFilter, setInsperctorFilter] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const finesPerPage = 5
	const [modalData, setModalData] = useState<{
		id: string
	} | null>(null)

	const queryClient = useQueryClient()

	const { data: fines, isLoading } = useQuery({
		queryKey: ['fines'],
		queryFn: () => adminService.getFines(),
		staleTime: 5 * 60 * 1000
	})

	const { data: inspectors } = useQuery({
		queryKey: ['inspectors'],
		queryFn: adminService.getInspectors,
		staleTime: 5 * 60 * 1000
	})

	const deleteFineMutation = useMutation({
		mutationFn: (id: string) => adminService.deleteFine(id),
		onSuccess() {
			toast.success(t.offense.deleted)
			queryClient.invalidateQueries({ queryKey: ['fines'] })
			setModalData(null)
		},
		onError(error) {
			console.error('Ошибка при удалении штрафа:', error)
			toast.error(t.offense.error)
		}
	})

	const handleDelete = (id: string) => {
		setModalData({ id })
	}

	const confirmDelete = () => {
		if (modalData) {
			deleteFineMutation.mutate(modalData.id)
		}
	}

	const filteredFines = fines
		? fines.filter((fine: IFinesResponse) => {
				const fineDate = new Date(fine.issuedAt).toISOString().split('T')[0]
				const searchQuery = searchTerm.toLowerCase()

				// Проверяем поиск
				const matchesSearch =
					fine.name.toLowerCase().includes(searchQuery) ||
					fine.amount.toString().includes(searchQuery)

				// Проверяем статус
				const matchesStatus = statusFilter ? fine.status === statusFilter : true

				// По инспектору
				const matchesInspector = inspectorFilter
					? String(fine.inspector?.id) === inspectorFilter
					: true

				const matchesDate =
					(!startDate || fineDate >= startDate) &&
					(!endDate || fineDate <= endDate)

				return matchesDate && matchesStatus && matchesSearch && matchesInspector
			})
		: []

	const totalFines = filteredFines.length || 0
	const totalPages = Math.ceil(totalFines / finesPerPage)

	// 🏷 Рассчитываем текущий диапазон элементов для пагинации
	const indexOfLastFine = currentPage * finesPerPage
	const indexOfFirstFine = indexOfLastFine - finesPerPage
	const currentFines = filteredFines?.slice(indexOfFirstFine, indexOfLastFine)

	// 🏷 Обработчики кнопок пагинации
	const nextPage = () => {
		if (indexOfLastFine < filteredFines?.length) {
			setCurrentPage(prev => prev + 1)
		}
	}

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
	}

	return (
		<>
			<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
				<div className='flex items-center justify-between'>
					<div>
						<Search
							placeholder={t.offense.search}
							onSearch={value => setSearchTerm(value)}
						/>
					</div>
					<div className='flex flex-col lg:flex-row gap-3'>
						<select
							value={statusFilter}
							onChange={e => setStatusFilter(e.target.value)}
							className='md:p-3 p-1 bg-bg text-white border-[#2e374a] rounded-xl md:text-xs text-[9px]'
						>
							<option value=''>{t.offense.allStatuses}</option>
							<option
								value='pending'
								className='bg-[#f7cb7375]'
							>
								{t.offense.pending}
							</option>
							<option
								value='paid'
								className='bg-[#5D8736]'
							>
								{t.offense.paid}
							</option>
							<option
								value='deleted'
								className='bg-[#BE3144]'
							>
								{t.statistics.deletedTransaction}
							</option>
						</select>
						<select
							value={inspectorFilter}
							onChange={e => setInsperctorFilter(e.target.value)}
							className='md:p-3 p-1 dark:bg-bg dark:text-white rounded-xl md:text-xs text-[9px]'
						>
							<option value=''>{t.offense.allInspectors}</option>
							{inspectors?.map((inspector: { id: string; name: string }) => (
								<option
									key={inspector.id}
									value={inspector.id}
								>
									{inspector.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<table className='w-full mt-5'>
					<thead>
						<tr>
							<th className='p-3 text-left text-[9px] md:text-xs'>
								{t.offense.name}
							</th>
							<th className='p-3 text-left text-[9px] md:text-xs'>
								{t.offense.amount}
							</th>
							<th className='p-3 text-left text-[9px] md:text-xs'>
								{t.offense.status}
							</th>
							<th className='p-3 text-left text-[9px] md:text-xs'>
								{t.offense.action}
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
									Загрузка...
								</td>
							</tr>
						) : currentFines?.length ? (
							currentFines?.map((fine: IFinesResponse) => (
								<tr
									key={fine.id}
									className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'
								>
									<td className='p-3 text-[9px] md:text-xs'>{fine.name}</td>
									<td className='p-3 text-[9px] md:text-xs'>
										{fine.amount} сум
									</td>
									<td className='p-3 text-[9px] md:text-xs'>
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
													? t.offense.paid
													: t.offense.deleted}
										</span>
									</td>
									<td className='p-3 text-[9px] md:text-xs'>
										<button
											onClick={() => handleDelete(fine.id)}
											className='py-1 px-3 bg-[#BE3144] text-white rounded-md cursor-pointer'
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
									{t.offense.notFound}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				{/* Пагинация */}
				<div className='flex justify-between items-center mt-5'>
					<button
						className='cursor-pointer'
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<ArrowLeft />
					</button>
					<span>{`${currentPage} / ${totalPages}`}</span>
					<button
						className='cursor-pointer'
						onClick={nextPage}
						disabled={currentPage >= totalPages}
					>
						<ArrowRight />
					</button>
				</div>
			</div>
			{/* Модальное окно подтверждения удаления */}
			{modalData &&
				createPortal(
					<div className='fixed inset-0 flex items-center justify-center bg-sidebar bg-opacity-50 z-50'>
						<div className='bg-[#605bca] dark:bg-sidebar p-6 rounded-lg shadow-lg w-80 text-center'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
								{t.offense.deleting}
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
								{t.offense.deleteMessage}
							</p>
							<div className='mt-4 flex justify-around'>
								<button
									className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
									onClick={confirmDelete}
								>
									{t.offense.deleting}
								</button>
								<button
									className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
									onClick={() => setModalData(null)}
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
