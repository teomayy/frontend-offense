'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { Search } from '@/components/ui/search/Search'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export default function InspectorPage() {
	const { locale } = useLanguageStore()
	const t = translation[locale]
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()
	const { push } = useRouter()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedInspectorId, setSelectedInspectorId] = useState<string | null>(
		null
	)

	const { data: inspectors, isLoading } = useQuery({
		queryKey: ['inspectors'],
		queryFn: adminService.getInspectors.bind(adminService)
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => adminService.deleteInspector(id),
		onSuccess() {
			toast.success('Инспектор успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['inspectors'] })
		},
		onError(error) {
			console.error('Ошибка при удалении инспектора:', error)
			toast.error('Не удалось удалить инспектора')
		}
	})

	const handleEdit = (id: string) => {
		push(`/v1/admin-dashboard/inspectors/${id}`)
	}

	const openModal = (id: string) => {
		setSelectedInspectorId(id)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setSelectedInspectorId(null)
		setIsModalOpen(false)
	}

	const confirmDelete = () => {
		if (selectedInspectorId) {
			deleteMutation.mutate(selectedInspectorId)
			closeModal()
		}
	}

	const filteredInspectors =
		inspectors?.filter(inspector => {
			const term = searchTerm.toLowerCase()
			return (
				inspector.name?.toLowerCase().includes(term) ||
				inspector.login?.toLowerCase().includes(term)
			)
		}) || []

	return (
		<>
			<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
				<div className='flex items-center justify-between'>
					<Search
						placeholder={t.header.search}
						onSearch={value => setSearchTerm(value)}
					/>
					<Link href='inspectors/add'>
						<button className='md:p-3 p-1 bg-[#605bca] dark:text-white hover:bg-[#6b65d1] text-white  border-none rounded-md cursor-pointer md:text-xs text-[9px]'>
							{' '}
							{t.inspectors.button}
						</button>
					</Link>
				</div>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='p-3 w-[40%] md:text-xs text-[9px]'>
								{t.inspectors.name}
							</td>
							<td className='p-3 w-[40%] md:text-xs text-[9px]'>
								{t.inspectors.login}
							</td>
							<td className='p-3 md:text-xs text-[9px]'>
								{t.inspectors.action}
							</td>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td
									colSpan={3}
									className='text-center p-3'
								>
									{t.TableOffenseTypes.loading}
								</td>
							</tr>
						) : filteredInspectors.length ? (
							filteredInspectors.map(inspector => (
								<tr
									key={inspector.id}
									className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'
								>
									<td className='p-3 border-none md:text-xs text-[9px]'>
										{inspector.name || '—'}
									</td>
									<td className='p-3 border-none md:text-xs text-[9px]'>
										{inspector.login}
									</td>
									<td className='p-3 md:text-xs text-[9px]'>
										<div className='flex gap-3'>
											<button
												onClick={() => handleEdit(inspector.id)}
												className='py-1 px-3 rounded-md border-none cursor-pointer bg-[#5D8736] text-white'
											>
												{t.inspectors.edit}
											</button>

											<button
												onClick={() => openModal(inspector.id)}
												className='py-1 px-3 rounded-md border-none cursor-pointer bg-[#BE3144] text-white'
											>
												{t.inspectors.delete}
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={3}
									className='text-center p-3'
								>
									{t.inspectors.noInspectors}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<Pagination />
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
