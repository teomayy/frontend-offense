'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { Search } from '@/components/ui/search/Search'

import { adminService } from '@/services/admin.service'

export default function InspectorPage() {
	const queryClient = useQueryClient()
	const { push } = useRouter()

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

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
			<div className='flex items-center justify-between'>
				<Search placeholder='Поиск инспектора' />
				<Link href='inspectors/add'>
					<button className='p-3 bg-[#605bca] dark:text-white hover:bg-[#6b65d1] text-white  border-none rounded-md cursor-pointer'>
						{' '}
						Добавить инспектора
					</button>
				</Link>
			</div>
			<table className='w-full'>
				<thead>
					<tr>
						<td className='p-3 w-[40%]'>Имя</td>
						<td className='p-3 w-[40%]'>Логин</td>
						<td className='p-3'>Действия</td>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td
								colSpan={3}
								className='text-center p-3'
							>
								Загрузка...
							</td>
						</tr>
					) : inspectors?.length ? (
						inspectors.map(inspector => (
							<tr
								key={inspector.id}
								className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'
							>
								<td className='p-3 border-none '>{inspector.name || '—'}</td>
								<td className='p-3 border-none '>{inspector.login}</td>
								<td className='p-3'>
									<div className='flex gap-3'>
										<button
											onClick={() => handleEdit(inspector.id)}
											className='py-1 px-3 rounded-md border-none cursor-pointer bg-[#5D8736] text-white'
										>
											Редактировать
										</button>

										<button
											onClick={() => deleteMutation.mutate(inspector.id)}
											className='py-1 px-3 rounded-md border-none cursor-pointer bg-[#BE3144] text-white'
										>
											Удалить
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
								Нет инспекторов
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination />
		</div>
	)
}
