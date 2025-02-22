import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState
} from 'react'

interface IUseLocalStorage<T> {
	key: string
	defaultValue: T
}

export function useLocalStorage<T>({
	defaultValue,
	key
}: IUseLocalStorage<T>): [T, Dispatch<SetStateAction<T>>, boolean] {
	const [value, setValue] = useState<T>(defaultValue)
	const [isLoading, setIsLoading] = useState(true)
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				setValue(JSON.parse(item))
			}
		} catch (error) {
			console.error('Ошибка при загрузке из localStorage:', error)
		} finally {
			setIsLoading(false)
			setIsInitialized(true)
		}
	}, [key])

	const saveToLocalStorage = useCallback(
		(newValue: T) => {
			try {
				window.localStorage.setItem(key, JSON.stringify(newValue))
			} catch (error) {
				console.error('Ошибка при сохранении в localStorage:', error)
			}
		},
		[key]
	)

	useEffect(() => {
		if (isInitialized) {
			saveToLocalStorage(value)
		}
	}, [key, value, isInitialized, saveToLocalStorage])

	return [value, setValue, isLoading]
}
