import { create } from 'zustand'

type Language = 'ru' | 'uz'

interface LanguageStore {
	locale: Language
	setLocale: (locale: Language) => void
}

export const useLanguageStore = create<LanguageStore>(set => ({
	locale:
		((typeof window !== 'undefined' &&
			localStorage.getItem('language')) as Language) || 'ru',
	setLocale: (locale: Language) => {
		localStorage.setItem('language', locale)
		set({ locale })
	}
}))
