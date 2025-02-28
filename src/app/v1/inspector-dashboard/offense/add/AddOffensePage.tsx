'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ICreateFine, IFineType } from '@/types/fines.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { inspectorService } from '@/services/inspector.service'

export function AddOffensePage() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

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
		onSuccess(fine) {
			console.log('OFFENSE', fine)
			if (!fine?.fineId) {
				console.error('❌ Ошибка: fineId отсутствует!')
				toast.error('Ошибка: ID штрафа не найден')
				return
			}
			toast.success(t['add-offense'].success)
			router.push(
				`/v1/inspector-dashboard/offense/payment-selection?fineId=${fine.fineId}`
			)
		},
		onError(error) {
			console.error('Ошибка при добавлении штрафа:', error)
			toast.error(t['add-offense'].error)
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
				{errors.name && (
					<span className='text-red-500'>{errors.name.message}</span>
				)}
				<input
					{...register('name', { required: t['add-offense'].nameRequired })}
					className='p-6 bg-bg text-white border-solid border border-[#2e374a] rounded-md mb-8 w-full'
					type='text'
					placeholder={t['add-offense'].name}
				/>

				{errors.phone && (
					<span className='text-red-500'>{errors.phone.message}</span>
				)}
				<input
					{...register('phone', { required: t['add-offense'].phoneRequired })}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
					type='tel'
					placeholder={t['add-offense'].phone}
				/>
				{errors.fineTypeId && (
					<span className='text-red-500'>{errors.fineTypeId.message}</span>
				)}
				<select
					{...register('fineTypeId', {
						required: t['add-offense'].offenseRequired
					})}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
				>
					<option value=''>{t['add-offense']['choose-offense']}</option>
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

				<input
					{...register('baseSalary')}
					className='p-6 bg-bg text-white border border-[#2e374a] rounded-md mb-4 w-full'
					type='number'
					placeholder={t['add-offense'].baseSalary}
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
					{createFineMutation.isPending
						? t['add-offense'].pending
						: t['add-offense']['add-offense']}
				</button>
			</form>
		</div>
	)
}
