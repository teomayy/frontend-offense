'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
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
			Выйти
		</button>
	)
}
