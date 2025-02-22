export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	if (message) {
		return Array.isArray(message) ? message[0] : message
	}

	return error.message ?? 'Произошла неизвестная ошибка'
}
