import { useQuery } from '@tanstack/react-query'

import { inspectorService } from '@/services/inspector.service'

export function useInspectorProfile() {
	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ['profile'],
		queryFn: () => inspectorService.getProfile(),
		staleTime: 5 * 60 * 1000
	})

	if (error) {
		console.error('Ошибка при загрузке профиля:', error)
	}

	return { data, isLoading, isSuccess, error }
}
