'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ICreateFine, IFineType } from '@/types/fines.types'

import { inspectorService } from '@/services/inspector.service'

export function AddOffensePage() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<ICreateFine>()

	const { data: fineTypes, isLoading } = useQuery({
		queryKey: ['fineTypes'],
		queryFn: () => inspectorService.getFineTypes()
	})

	const selectedFineTypeId = watch('fineTypeId')
	const baseSalary = watch('baseSalary')

	const [calculatedAmount, setCalculatedAmount] = useState<number>(0)

	useEffect(() => {
		if (selectedFineTypeId && fineTypes) {
			const fineType = fineTypes.find(type => type.id === selectedFineTypeId)
			if (!fineType) return

			let amount = fineType.fixedAmount || 0

			if (fineType.percentage && baseSalary) {
				amount = Math.round(Number(baseSalary) * (fineType.percentage / 100))
			}

			setCalculatedAmount(amount)
			setValue('amount', amount)
		}
	}, [selectedFineTypeId, baseSalary, fineTypes, setValue])

	const createFineMutation = useMutation({
		mutationFn: (data: ICreateFine) => inspectorService.createFine(data),
		onSuccess() {
			toast.success('Штраф успешно добавлен!')
			router.push('/v1/inspector-dashboard/offense')
		},
		onError(error) {
			console.error('Ошибка при добавлении штрафа:', error)
			toast.error('Не удалось добавить штраф')
		}
	})

	const handleBaseSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSalary = Number(e.target.value) || 0
		setValue('baseSalary', newSalary)
	}
	// const updateAmount = (fineTypeId: string, baseSalary: number) => {
	// 	if (!fineTypes || !baseSalary) return
	// 	const fineType = fineTypes.find((t: IFineType) => t.id === fineTypeId)
	// 	if (!fineType) return

	// 	let amount =
	// 		fineType.fixedAmount ||
	// 		(fineType.percentage ? (baseSalary * fineType.percentage) / 100 : 0)
	// 	setCalculatedAmount(amount)
	// 	setValue('amount', amount)
	// }

	return (
		<div className='bg-sidebar p-5 rounded-xl mt-5'>
			<form
				className='flex flex-wrap justify-between'
				onSubmit={handleSubmit(data => {
					const formattedData: ICreateFine = {
						...data,
						baseSalary: Number(data.baseSalary) || 0,
						amount: calculatedAmount
					}
					console.log('Отправляемые данные:', data)
					console.log('Тип `fineTypeId`:', typeof formattedData.fineTypeId)
					createFineMutation.mutate(formattedData)
				})}
			>
				<input
					{...register('name', { required: 'ФИО обязательно' })}
					className='p-6 bg-bg text-white border-solid border border-[#2e374a] rounded-md mb-8 w-full'
					type='text'
					placeholder='ФИО'
				/>
				{errors.name && (
					<span className='text-red-500'>{errors.name.message}</span>
				)}

				<input
					{...register('phone', { required: 'Телефон обязательно' })}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
					type='tel'
					placeholder='Номер телефона'
				/>
				{errors.phone && (
					<span className='text-red-500'>{errors.phone.message}</span>
				)}

				<select
					{...register('fineTypeId', { required: 'Выберите штрафа' })}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
				>
					<option value=''>Выберите штрафа</option>
					{isLoading ? (
						<option>Загрузка...</option>
					) : (
						fineTypes?.map((type: IFineType) => (
							<option
								value={type.id}
								key={type.id}
							>
								{type.name}
							</option>
						))
					)}
				</select>
				{errors.fineTypeId && (
					<span className='text-red-500'>{errors.fineTypeId.message}</span>
				)}
				<input
					{...register('baseSalary')}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
					type='number'
					placeholder='Базовый оклад (если штраф в %)'
					onChange={handleBaseSalaryChange}
				/>

				<input
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
					type='text'
					placeholder='Сумма штрафа'
					value={calculatedAmount ?? ''}
					readOnly
				/>

				<button
					className='w-full p-7 bg-teal-700 border-none rounded-md cursor-pointer'
					type='submit'
					disabled={createFineMutation.isPending}
				>
					{createFineMutation.isPending ? 'Добавление...' : 'Добавить штраф'}
				</button>
			</form>
		</div>
	)
}
