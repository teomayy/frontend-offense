import { IUser, TypeUserForm } from '@/types/auth.types'
import {
	EnumFineStatus,
	IFineType,
	IFinesResponse,
	IUpdateFine,
	TypeFineFormState
} from '@/types/fines.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	inspector: IUser
	statistics: {
		label: string
		value: number
	}
}

class InspectorService {
	private BASE_URL = '/inspector/profile'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)

			const statistics = Object.entries(response.data.statistics).map(
				([key, value]) => ({
					label: this.getStatisticsLabel(key),
					value: value
				})
			)
			return { ...response.data, statistics }
		} catch (error) {
			console.error('Ошибка при получении профиля:', error)
			throw error
		}
	}

	private getStatisticsLabel(key: string): string {
		const labels: Record<string, string> = {
			totalFines: 'Всего штрафов',
			paidFines: 'Оплаченные штрафы',
			pendingFines: 'Не оплаченные штрафы'
		}
		return labels[key] ?? 'Неизвестный статус'
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}

	async getFines(): Promise<IFinesResponse[]> {
		const response = await axiosWithAuth.get<IFinesResponse[]>(`/fine`)

		return response.data
	}

	async createFine(data: TypeFineFormState) {
		if (!data.fineTypeId) {
			throw new Error('Не указан тип штрафа')
		}
		const fineType = await this.getFineTypeById(data.fineTypeId!)

		let amount = fineType.fixedAmount || 0
		let baseSalary = Number(data.baseSalary) || 0

		if (fineType.percentage && baseSalary) {
			amount = Math.round(baseSalary * (fineType.percentage / 100))
		}

		const response = await axiosWithAuth.post(`/fine/create`, {
			...data,
			baseSalary,
			amount
		})

		return response.data
	}

	async updateFine(fineId: string, data: IUpdateFine): Promise<IFinesResponse> {
		const response = await axiosWithAuth.patch<IFinesResponse>(
			`/fine/${fineId}`,
			data
		)
		return response.data
	}

	async deleteFine(id: string) {
		const response = await axiosWithAuth.delete(`/fine/${id}`)
		return response.data
	}

	/**
	 * Оплата штрафа (изменение статуса на `PAID`)
	 */
	async payFine(fineId: string): Promise<void> {
		await axiosWithAuth.patch(`fine/${fineId}/pay`)
	}

	/**
	 * Получение статистики инспектора
	 */
	async getInspectorStats() {
		const response = await axiosWithAuth.get(`fine/inspector/stats`)
		return response.data
	}

	/**
	 * Фильтрация штрафов
	 */
	async getFinesWithFilters(filters: {
		inspectorId?: string
		status?: EnumFineStatus
		startDate?: string
		endDate?: string
	}) {
		const response = await axiosWithAuth.get<IFinesResponse[]>('fine/filter', {
			params: filters
		})
		return response.data
	}

	/**
	 * Получение списка типов штрафов
	 */
	async getFineTypes(): Promise<IFineType[]> {
		const response = await axiosWithAuth.get<IFineType[]>(`/fine-type`)
		return response.data
	}

	async createFineTypes(data: IFineType) {
		const response = await axiosWithAuth.post('/fine-type/create', data)
		return response.data
	}

	async deleteFineType(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}

	async getFineTypeById(fineTypeId: string): Promise<IFineType> {
		const response = await axiosWithAuth.get<IFineType>(
			`/fine-type/${fineTypeId}`
		)
		return response.data
	}
}

export const inspectorService = new InspectorService()
