import { useQuery } from '@tanstack/react-query'

import { adminService } from '@/services/admin.service'

export function useAdminProfile() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['profile'],
		queryFn: () => adminService.getProfile(),
		staleTime: 5 * 60 * 1000
	})

	return { data, isLoading, isSuccess }
}
