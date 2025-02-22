import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useInspectorProfile } from '@/hooks/useInspectorProfile'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { data, isSuccess } = useInspectorProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				login: data.inspector.login,
				name: data.inspector.name
			})
		}
	}, [isSuccess])
}
