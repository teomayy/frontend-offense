'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { FineTypesTable } from '@/components/ui/TableFineTypes'

import { IFineType } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { inspectorService } from '@/services/inspector.service'

export function AddFineTypePage() {
	const router = useRouter()
	const { locale } = useLanguageStore()
	const t = translation[locale]
	const [searchTerm, setSearchTerm] = useState('')

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFineType>()

	const [fineType, setFineType] = useState<'fixed' | 'percentage'>('fixed')

	const createFineTypeMutation = useMutation({
		mutationFn: (data: IFineType) => inspectorService.createFineTypes(data),
		onSuccess() {
			toast.success('Тип штрафа успешно добавлен!')
			router.push('/v1/inspector-dashboard/offense/add')
		},
		onError(error) {
			console.error('Ошибка при добавлении типа штрафа:', error)
			toast.error('Не удалось добавить тип штрафа')
		}
	})

	const handleChangeType = (type: 'fixed' | 'percentage') => {
		setFineType(type)
	}

	return (
		<div>
			<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl mt-5'>
				<form
					className='flex flex-wrap justify-between gap-4'
					onSubmit={handleSubmit(data => createFineTypeMutation.mutate(data))}
				>
					<input
						{...register('name', { required: 'Название обязательно' })}
						className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-4 w-full'
						type='text'
						placeholder={t.addTypeOffense.name}
					/>
					{errors.name && (
						<span className='text-[#BE3144]'>{errors.name.message}</span>
					)}
					<div className='w-full flex gap-4'>
						<button
							type='button'
							className={`p-4 border-none outline-none rounded-md w-1/2 ${
								fineType === 'fixed'
									? 'bg-teal-600 text-white'
									: 'dark:bg-bg bg-[#CDC1FF]'
							}`}
							onClick={() => handleChangeType('fixed')}
						>
							{t.addTypeOffense.fixedAmount}
						</button>
						<button
							type='button'
							className={`p-4 border-none outline-none rounded-md w-1/2 ${
								fineType === 'percentage'
									? 'bg-teal-600 text-white'
									: 'dark:bg-bg bg-[#CDC1FF]'
							}`}
							onClick={() => handleChangeType('percentage')}
						>
							{t.addTypeOffense.percentage}
						</button>
					</div>
					{fineType === 'fixed' ? (
						<input
							{...register('fixedAmount', { valueAsNumber: true })}
							className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-4 w-full'
							type='number'
							placeholder={t.addTypeOffense.fixedAmountOffense}
						/>
					) : (
						<input
							{...register('percentage', { valueAsNumber: true })}
							className='p-6 dark:bg-bg bg-[#CDC1FF] dark:text-white border-none outline-none rounded-md mb-4 w-full'
							type='number'
							placeholder={t.addTypeOffense.percentage}
						/>
					)}

					<button
						className='w-full p-7 bg-teal-700  text-white border-none rounded-md cursor-pointer'
						type='submit'
						disabled={createFineTypeMutation.isPending}
					>
						{createFineTypeMutation.isPending
							? t['add-offense'].pending
							: t.addTypeOffense.button}
					</button>
				</form>
			</div>
			<FineTypesTable />
		</div>
	)
}
