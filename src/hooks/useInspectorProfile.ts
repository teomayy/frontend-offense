import { useQuery } from '@tanstack/react-query'

import { getAccessToken } from '@/services/auth-token.service'
import { inspectorService } from '@/services/inspector.service'

export function useInspectorProfile() {
	const authToken = getAccessToken()
	console.log('Токен при загрузке профиля:', authToken)

	const { data, isLoading, isSuccess, error, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			if (!authToken) throw new Error('Нет токена авторизации')
			return inspectorService.getProfile()
		},
		enabled: !!authToken,
		staleTime: 5 * 60 * 1000,
		retry: 2
	})

	if (error) {
		console.error('Ошибка при загрузке профиля:', error)
	}

	return { data, isLoading, isSuccess, error, refetch }
}
