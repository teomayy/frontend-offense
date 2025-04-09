import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class AdminService {
	private BASE_URL = '/admin'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get(`${this.BASE_URL}`)

			return response.data
		} catch (error) {
			console.error('Ошибка при получении профиля:', error)
			throw error
		}
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}`, data)
		return response.data
	}

	async addInspector(data: { login: string; name: string; password: string }) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/inspector`,
			data
		)
		return response.data
	}

	async getInspectors(): Promise<IUser[]> {
		try {
			const response = await axiosWithAuth.get(`${this.BASE_URL}/inspectors`)
			return response.data
		} catch (error) {
			console.error('Ошибка при получении списка инспекторов:', error)
			throw new Error('Не удалось получить список инспекторов')
		}
	}

	async updateInspector(id: string, data: TypeUserForm) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/inspector/${id}`,
			data
		)
		return response.data
	}

	async deleteInspector(id: string) {
		const response = await axiosWithAuth.delete(
			`${this.BASE_URL}/inspector/${id}`
		)
		return response.data
	}

	async getFines(inspectorId?: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/fines`, {
			params: inspectorId ? { inspectorId } : {}
		})

		return response.data
	}

	async deleteFine(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/fine/${id}`)
		return response.data
	}

	async getStatistics() {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/stats`)
		return response.data
	}

	async getFineLogs(fineId: string) {
		const response = await axiosWithAuth.get(`/fine-log/${fineId}`)
		return response.data
	}
}

export const adminService = new AdminService()
