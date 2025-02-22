'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/login')
	})

	return (
		<button
			className='py-1.5 px-layout my-2 flex items-center gap-3 cursor-pointer rounded-xl bg-none border-none w-full hover:bg-border text-center'
			onClick={() => mutate()}
		>
			<LogOut size={20} />
			{t.auth.logout}
		</button>
	)
}
