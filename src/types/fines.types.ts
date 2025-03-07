export enum EnumFineStatus {
	PENDING = 'pending',
	PAID = 'paid',
	DELETED = 'deleted'
}

export interface ICreateFine {
	name: string
	phone: string
	fineTypeId: string
	baseSalary?: number
	amount?: number
}

export interface IFinesResponse {
	id: string
	name: string
	inspectorId: string
	inspector?: { id: string; name: string }
	phone: string
	fineTypeId: string
	baseSalary: number
	amount: number
	discountedAmount?: number
	status: EnumFineStatus
	paymentReference: string
	issuedAt: Date | string
	dueDate: Date | string
}

export interface IFineType {
	id: string
	name: string
	percentage?: number
	fixedAmount?: number
}

export interface IUpdateFine {
	name?: string
	amount?: number
	status?: EnumFineStatus
}

export type TypeFineFormState = Partial<Omit<IFinesResponse, 'id'>>
