'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IUser } from '@/types/auth.types'

import { adminService } from '@/services/admin.service'

export function EditInspectorPage() {
	const { id } = useParams() as { id: string }
	const router = useRouter()

	const { data: inspector, isLoading } = useQuery({
		queryKey: ['inspector', id],
		queryFn: async () => {
			const inspectors = await adminService.getInspectors()
			false
			return inspectors.find(i => i.id === id) || null
		},
		enabled: !!id
	})

	const {
		register,
		handleSubmit,
		setValue,
		formState: { isSubmitting }
	} = useForm<IUser>()

	if (inspector) {
		setValue('id', inspector.id)
		setValue('name', inspector.name)
		setValue('login', inspector.login)
	}

	const updateInspectorMutation = useMutation({
		mutationFn: ({ id, ...updatedInspector }: IUser) =>
			adminService.updateInspector(id, updatedInspector),
		onSuccess() {
			toast.success('Данные инспектора обновлены!')
			router.push('/v1/admin-dashboard/inspectors')
		},
		onError(error) {
			console.error('Ошибка обновления инспектора:', error)
			toast.error('Не удалось обновить данные!')
		}
	})

	if (isLoading) return <p>Загрузка...</p>
	if (!inspector) return <p>Инспектор не найден!</p>

	const onSubmit: SubmitHandler<IUser> = data => {
		if (!data.id) {
			console.error('Ошибка: ID отсутствует в форме!', data)
			toast.error('Ошибка: отсутствует ID инспектора!')
			return
		}

		if (!data.password?.trim()) {
			delete data.password
		}

		updateInspectorMutation.mutate(data)
	}

	return (
		<div className='flex gap-12 mt-5'>
			<div className='w-full dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl'>
				<form
					className='flex flex-col'
					onSubmit={handleSubmit(onSubmit)}
				>
					<input
						className='p-5 border-none outline-none rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='hidden'
						{...register('id')}
					/>
					<label className='text-[12px]'>ФИО</label>
					<input
						className='p-3 border-none outline-none  rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='text'
						{...register('name', { required: 'Введите ФИО' })}
						required
					/>
					<label className='text-[12px]'>Логин</label>
					<input
						className='p-3 border-none outline-none  rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='text'
						{...register('login', { required: 'Введите логин' })}
						required
					/>
					<label className='text-[12px]'>Пароль</label>
					<input
						className='p-3 border-none outline-none  rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='password'
						{...register('password')}
						placeholder='Оставьте пустым, если не хотите менять'
					/>
					<button
						className='w-full p-5 bg-teal-700 text-white border-none rounded-md cursor-pointer mt-5'
						type='submit'
						disabled={updateInspectorMutation.isPending}
					>
						{updateInspectorMutation.isPending || isSubmitting
							? 'Обновление..'
							: 'Обновить'}
					</button>
				</form>
			</div>
		</div>
	)
}
