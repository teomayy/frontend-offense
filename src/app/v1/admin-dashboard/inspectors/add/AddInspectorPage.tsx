'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { adminService } from '@/services/admin.service'

interface IInspectorForm {
	name: string
	login: string
	password: string
}

export function AddInspectorPage() {
	const queryClient = useQueryClient()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IInspectorForm>()

	const addInspectorMutation = useMutation({
		mutationFn: (data: IInspectorForm) => adminService.addInspector(data),
		onSuccess() {
			toast.success('Инспектор добавлен успешно')
			queryClient.invalidateQueries({ queryKey: ['inspectors'] })
			router.push('/v1/admin-dashboard/inspectors')
			reset()
		},
		onError: error => {
			console.error('Ошибка при добавлении инспектора:', error)
			toast.error('Не удалось добавить инспектора')
		}
	})

	const onSubmit: SubmitHandler<IInspectorForm> = data => {
		addInspectorMutation.mutate(data)
	}

	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
			<form
				className='flex flex-wrap justify-between'
				action=''
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8 w-full'
					type='text'
					placeholder='ФИО'
					{...register('name', { required: 'Введите ФИО' })}
				/>
				{errors.name && (
					<span className='text-red-500'>{errors.name.message}</span>
				)}

				<input
					className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8 w-[45%]'
					type='text'
					placeholder='Логин'
					{...register('login', { required: 'Введите логин' })}
				/>
				{errors.login && (
					<span className='text-red-500'>{errors.login.message}</span>
				)}

				<input
					className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8 w-[45%]'
					type='password'
					placeholder='Пароль'
					{...register('password', {
						required: 'Введите пароль',
						minLength: { value: 6, message: 'Минимум 6 символов' }
					})}
				/>
				{errors.password && (
					<span className='text-red-500'>{errors.password.message}</span>
				)}

				<button
					className='w-full p-7 bg-teal-700 border-none rounded-md cursor-pointer text-white'
					type='submit'
					disabled={addInspectorMutation.isPending}
				>
					{addInspectorMutation.isPending ? 'Добавление..' : 'Добавить'}
				</button>
			</form>
		</div>
	)
}
