import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useAdminProfile } from '@/hooks/useAdminProfile'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { data, isSuccess } = useAdminProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				login: data.login,
				name: data.name
			})
		}
	}, [isSuccess])
}
