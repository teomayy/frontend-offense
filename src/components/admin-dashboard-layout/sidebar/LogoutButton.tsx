'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/login')
	})

	const handleLogoutClick = () => setIsModalOpen(true)

	const confirmLogout = () => {
		setIsModalOpen(false)
		mutate()
	}

	return (
		<>
			<button
				className='md:py-1.5 md:px-layout mt-2 p-2 flex md:flex-row flex-col items-center gap-2.5 cursor-pointer rounded-xl bg-none border-none lg:w-full hover:bg-border text-center transition-colors'
				onClick={handleLogoutClick}
			>
				<LogOut size={20} />
				{t.auth.logout}
			</button>

			{isModalOpen &&
				createPortal(
					<div className='fixed inset-0 flex items-center justify-center bg-bg bg-opacity-50 z-50'>
						<div className='bg-white dark:bg-sidebar p-6 rounded-lg shadow-lg w-80 text-center'>
							<h3 className='text-lg font-semibold'>{t.auth.logout}</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
								{t.auth.logoutModal}
							</p>
							<div className='mt-4 flex justify-around'>
								<button
									className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
									onClick={confirmLogout}
								>
									{t.auth.logout}
								</button>
								<button
									className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
									onClick={() => setIsModalOpen(false)}
								>
									{t.auth.cancel}
								</button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</>
	)
}
