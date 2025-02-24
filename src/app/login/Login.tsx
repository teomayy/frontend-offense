'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { authService } from '@/services/auth.service'

export function Login() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<IAuthForm>({
		mode: 'onSubmit'
	})
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const router = useRouter()

	const mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: IAuthForm) => authService.login(data),
		onSuccess() {
			toast.success(t.auth.success)

			router.push(DASHBOARD_PAGES.HOME)
		},
		onError(error) {
			toast.error(t.auth.error)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		console.log('Отправляемые данные:', data)
		mutation.mutate(data)
	}

	return (
		<div className='w-full h-screen flex items-center justify-center dark:bg-bg bg-[#CDC1FF]'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='dark:bg-sidebar bg-[#A294F9] p-14 rounded-xl w-[400px] flex flex-col items-center gap-6'
			>
				<Heading title={t.auth.auth} />

				<div className='w-full'>
					<input
						type='text'
						{...register('login', { required: t.inspectors.loginRequired })}
						placeholder={t.auth['login']}
						className='w-full p-4 border border-gray-500 rounded-md dark:bg-bg bg-[#CDC1FF] dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
					/>
					{errors.login && (
						<p className='text-red-500 text-sm'>{errors.login.message}</p>
					)}
				</div>

				<div className='w-full'>
					<input
						type='password'
						{...register('password', {
							required: t.inspectors.passwordRequired
						})}
						placeholder={t.auth.password}
						className='w-full p-4 border border-gray-500 rounded-md dark:bg-bg bg-[#CDC1FF] dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
					/>
					{errors.password && (
						<p className='text-red-500 text-sm'>{errors.password.message}</p>
					)}
				</div>

				<button
					type='submit'
					disabled={mutation.isPending || isSubmitting}
					className='w-full p-4 bg-teal-700 text-white rounded-md hover:bg-teal-600 transition disabled:bg-gray-600'
				>
					{mutation.isPending ? 'Вход...' : t.auth['log-in']}
				</button>
			</form>
		</div>
	)
}
