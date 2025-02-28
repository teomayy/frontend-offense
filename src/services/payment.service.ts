import { axiosWithAuth } from '@/api/interceptors'

export const payService = {
	async createPayment({ fineId, method }: { fineId: string; method: string }) {
		const response = await axiosWithAuth.post('/payme/process', {
			fineId,
			method
		})
		return response.data
	}
}
