export enum Locales {
	RU = 'ru',
	UZ = 'uz'
}

export const translation = {
	[Locales.RU]: {
		title: 'Добро пожаловать!',
		description: 'Выберите язык и наслаждайтесь приложением.',
		menu: {
			stat: 'Статистика',
			home: 'Панель управления',
			inspectors: 'Инспекторы',
			offenses: 'Штрафы',
			settings: 'Настройки'
		},
		auth: {
			auth: 'Авторизация',
			login: 'Логин',
			logout: 'Выйти',
			'log-in': 'Войти',
			password: 'Паролль'
		},
		offense: {
			name: 'ФИО',
			date: 'Дата штрафа',
			amount: 'Сумма',
			status: 'Статус',
			action: 'Действия',
			search: 'Поиск штрафа...',
			addTypeOffense: 'Добавить тип штрафа',
			addOffense: 'Добавить штраф',
			pending: 'Ожидает оплаты',
			deleting: 'Удалить'
		},
		'add-offense': {
			name: 'ФИО',
			phone: 'Номер телефона',
			'choose-offense': 'Выберите штрафа',
			baseSalary: 'Базовый оклад (если штраф в %)',
			'add-offense': 'Добавить штраф'
		},
		statistics: {
			offense: 'Всего штрафа',
			'paid-offenses': 'Оплаченные штрафы',
			pending: 'Ожидают оплаты',
			'last-transaction': 'Последние транзакции',
			name: 'ФИО',
			pendingTransaction: 'В ожидании',
			paidTransaction: 'Оплачен',
			deletedTransaction: 'Удален',
			status: 'Статус',
			date: 'Дата и время',
			amount: 'Сумма',
			'weekly-review': 'Еженедельный обзор'
		},
		header: {
			search: 'Поиск...'
		}
	},
	[Locales.UZ]: {
		title: 'Xush kelibsiz!',
		description: 'Tilni tanlang va ilovadan zavqlaning.',
		menu: {
			stat: 'Statistika',
			home: 'Boshqaruv paneli',
			inspectors: 'Inspektorlar',
			offenses: 'Jarimalar',
			settings: 'Sozlamalar'
		},
		auth: {
			auth: 'Kirish',
			login: 'Login',
			logout: 'Chiqish',
			'log-in': 'Kirish',
			password: 'Parol'
		},
		offense: {
			name: 'FIO',
			date: 'Jarima sanasi',
			amount: 'Miqdori',
			status: 'Holat',
			action: 'Amallar',
			search: 'Jarima qidirish...',
			addTypeOffense: "Jarima turini qo'shish",
			addOffense: "Jarima qo'shish",
			pending: "To'lov kutulmoqda",
			deleting: "O'chirish"
		},
		'add-offense': {
			name: 'FIO',
			phone: 'Telefon raqam',
			'choose-offense': 'Jarima tanlang',
			baseSalary: "Eng kam ish haqqi (agar jarima % bo'lsa)",
			'add-offense': "Jarimani qo'shish"
		},
		statistics: {
			offense: 'Jarimalar soni',
			'paid-offenses': "To'langan jarimalar",
			pending: "To'lov kutulmoqda",
			'last-transaction': "Oxirgi to'lovlar",
			name: 'FIO',
			pendingTransaction: 'Kutulmoqda',
			paidTransaction: "To'langan",
			deletedTransaction: 'Uchirilgan',
			status: 'Holat',
			amount: 'Miqdori',
			date: 'Jarima sanasi',
			'weekly-review': 'Haftalik sharh'
		},
		header: {
			search: 'Qidirish...'
		}
	}
}
