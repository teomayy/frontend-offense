'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
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
						name='id'
					/>
					<label className='text-[12px]'>ФИО</label>
					<input
						className='p-3 border-none outline-none rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='text'
						{...register('name')}
						required
					/>
					<label className='text-[12px]'>Логин</label>
					<input
						className='p-3 border-none outline-none rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='text'
						{...register('login', {
							required: 'Логин необходимо'
						})}
					/>
					<label className='text-[12px]'>Пароль</label>
					<input
						className='p-3 border-none outline-none rounded-md dark:bg-bg bg-[#CDC1FF] my-3'
						type='password'
						{...register('password')}
						placeholder='Оставьте пустым, если не хотите менять'
					/>
					<button
						className='w-full p-5 bg-teal-700 text-white border-none rounded-md cursor-pointer mt-5'
						type='submit'
						disabled={isPending}
					>
						{isPending ? 'Обновление..' : 'Обновить'}
					</button>
				</form>
			</div>
		</div>
	)
}
