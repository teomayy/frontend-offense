'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

interface IInspectorForm {
	name: string
	login: string
	password: string
}

export function AddInspectorPage() {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { locale } = useLanguageStore()
	const t = translation[locale]

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IInspectorForm>()

	const addInspectorMutation = useMutation({
		mutationFn: (data: IInspectorForm) => adminService.addInspector(data),
		onSuccess() {
			toast.success(t.inspectors.success)
			queryClient.invalidateQueries({ queryKey: ['inspectors'] })
			router.push('/v1/admin-dashboard/inspectors')
			reset()
		},
		onError: error => {
			console.error('Ошибка при добавлении инспектора:', error)
			toast.error(t.inspectors.error)
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
				{errors.name && (
					<span className='text-red-500'>{errors.name.message}</span>
				)}
				<input
					className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8 w-full'
					type='text'
					placeholder={t.inspectors.name}
					{...register('name', { required: t['add-offense'].nameRequired })}
				/>
				<div className='w-[45%] flex flex-col'>
					{errors.login && (
						<span className='text-red-500'>{errors.login.message}</span>
					)}
					<input
						className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8 '
						type='text'
						placeholder={t.inspectors.login}
						{...register('login', { required: t.inspectors.loginRequired })}
					/>
				</div>
				<div className='w-[45%] flex flex-col'>
					{errors.password && (
						<span className='text-red-500'>{errors.password.message}</span>
					)}

					<input
						className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-8'
						type='password'
						placeholder={t.inspectors.password}
						{...register('password', {
							required: t.inspectors.passwordRequired,
							minLength: { value: 6, message: 'Минимум 6 символов' }
						})}
					/>
				</div>

				<button
					className='w-full p-7 bg-teal-700 border-none rounded-md cursor-pointer text-white'
					type='submit'
					disabled={addInspectorMutation.isPending}
				>
					{addInspectorMutation.isPending
						? t.inspectors.pending
						: t.inspectors.addButton}
				</button>
			</form>
		</div>
	)
}
