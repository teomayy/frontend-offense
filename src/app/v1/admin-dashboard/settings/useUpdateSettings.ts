import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/auth.types'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'
import { adminService } from '@/services/admin.service'

export function useUpdateSettings() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: (data: TypeUserForm) => adminService.update(data),
		onSuccess() {
			toast.success(t.updateProfile.updated)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError(error) {
			console.error('Ошибка обновления инспектора:', error)
			toast.error(t.updateProfile.error)
		}
	})

	return { mutate, isPending }
}
