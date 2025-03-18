'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { paymentMethods } from '@/constants/methods.constants'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { payService } from '@/services/payment.service'

function PaymentContent() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const router = useRouter()
	const searchParams = new URLSearchParams(
		typeof window !== 'undefined' ? window.location.search : ''
	)
	const fineId = searchParams.get('fineId')

	const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

	useEffect(() => {
		if (!fineId) {
			toast.error('Штраф не найден')
			router.push('/v1/inspector-dashboard/offense')
		}
	}, [fineId, router])

	const handlePayment = async () => {
		if (!selectedMethod || !fineId) {
			toast.error('Выберите способ оплаты')
			return
		}

		try {
			const response = await payService.createPayment({
				fineId,
				method: selectedMethod
			})

			if (response.success) {
				toast.success(t.PaymentPage.success)
				router.push('/v1/inspector-dashboard/offense')
			} else {
				toast.error(response.message || 'Ошибка при создании платежа')
			}
		} catch (error) {
			console.error('Ошибка при создании платежа:', error)
			toast.error(t.PaymentPage.error)
		}
	}

	return (
		<div className='max-w-lg mx-auto mt-10 bg-sidebar p-6 rounded-lg shadow-lg'>
			<h2 className='text-xl font-semibold mb-4'>{t.PaymentPage.title}</h2>

			<div className='space-y-4'>
				{paymentMethods.map(method => (
					<button
						key={method.id}
						className={`flex items-center w-full p-4 border rounded-lg cursor-pointer transition ${selectedMethod === method.id ? 'border-blue-500 bg-[#517aa6]' : 'border-gray-300'}`}
						onClick={() => setSelectedMethod(method.id)}
					>
						<Image
							src={method.icon}
							alt={method.name}
							width={50}
							height={50}
							className='mr-3 bg-white rounded-lg'
						/>
						{method.name}
					</button>
				))}
			</div>
			<button
				className='mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition'
				onClick={handlePayment}
			>
				{t.PaymentPage.button}
			</button>
		</div>
	)
}

export default function PaymentSelectionPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<PaymentContent />
		</Suspense>
	)
}
