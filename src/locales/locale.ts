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
			deleting: 'Удалить',
			deleted: 'Штраф удалён!'
		},
		'add-offense': {
			name: 'ФИО',
			phone: 'Номер телефона',
			'choose-offense': 'Выберите штрафа',
			baseSalary: 'Базовый оклад (если штраф в %)',
			'add-offense': 'Добавить штраф',
			success: 'Штраф успешно добавлен!',
			pending: 'Добавление...',
			error: 'Не удалось добавить штраф!',
			nameRequired: 'ФИО обязательно',
			phoneRequired: 'Телефон обязательно',
			offenseRequired: 'Выберите штрафа'
		},
		addTypeOffense: {
			name: 'Название штрафа',
			fixedAmount: 'Фиксированная сумма',
			percentage: 'Процент от оклада',
			fixedAmountOffense: 'Фиксированная сумма штрафа',
			percentageBaseSalary: 'Процент от оклада',
			button: 'Добавить тип штрафа'
		},
		statistics: {
			inspectors: 'Инспекторы',
			activeFines: 'Активный штрафы',
			archivedFines: 'Архивированный штрафы',
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
			'weekly-review': 'Еженедельный обзор',
			noActive: 'Нет активных штрафов'
		},
		header: {
			search: 'Поиск...'
		},
		settings: {
			name: 'ФИО',
			login: 'Логин',
			password: 'Пароль',
			inputPassword: 'Оставьте пустым, если не хотите менять',
			button: 'Обновить',
			updatingButton: 'Обновление...'
		},
		updateProfile: {
			updated: 'Профиль успешно обновлен!',
			error: 'Не удалось обновить данные!'
		},
		rightBar: {
			availableNow: '🔥 Доступно сейчас',
			h2: 'Как пользоваться программой?',
			h3: 'Обучение занимает 5 минут',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repudiandae harum numquam veritatis? Modi quibusdam aliquid quos veritatis',
			button: 'Смотреть'
		},
		TableOffenseTypes: {
			search: 'Поиск...',
			name: 'Название',
			percentage: 'Процент',
			fixedAmount: '	Фиксированная сумма',
			action: 'Действия',
			loading: 'Загрузка...',
			delete: 'Удалить'
		},
		inspectors: {
			name: 'ФИО',
			login: 'Логин',
			action: 'Действия',
			edit: 'Редактировать',
			delete: 'Удалить',
			button: 'Добавить инспектора',
			noInspectors: 'Нет инспекторов',
			previous: 'Назад',
			next: 'Далее',
			addButton: 'Добавить'
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
			deleting: "O'chirish",
			deleted: "Jarima o'chirildi!"
		},
		'add-offense': {
			name: 'FIO',
			phone: 'Telefon raqam',
			'choose-offense': 'Jarima tanlang',
			baseSalary: "Eng kam ish haqqi (agar jarima % bo'lsa)",
			'add-offense': "Jarimani qo'shish",
			success: "Jarima qo'shildi!",
			pending: "Qo'shilmoqda...",
			error: "Jarimani qo'shib bo'lmadi!",
			nameRequired: 'FIO kiritish shart',
			phoneRequired: 'Telefon raqam kiritish shart',
			offenseRequired: 'Jarima tanlash shart'
		},
		addTypeOffense: {
			name: 'Jarima nomi',
			fixedAmount: 'Belgilangan miqdor',
			percentage: 'Ish haqi foizi',
			fixedAmountOffense: 'Belgilangan jarima miqdori',
			button: "Jarima turini qo'shish"
		},
		statistics: {
			inspectors: 'Inspectorlar',
			activeFines: 'Faol jarimalar',
			archivedFines: "To'lov kutilmoqda",
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
			'weekly-review': 'Haftalik sharh',
			noActive: "Faol jarimalar yo'q"
		},
		header: {
			search: 'Qidirish...'
		},
		settings: {
			name: 'FIO',
			login: 'Login',
			password: 'Parol',
			inputPassword: "O'zgartirmoqchi bo'masangiz, bo'sh qoldiring",
			button: 'Yangilash',
			updatingButton: 'Yangilanmoqda...'
		},
		updateProfile: {
			updated: 'Profil muvaffaqiyatli yangilandi!',
			error: 'Maʼlumotlarni yangilab boʻlmadi!'
		},
		rightBar: {
			availableNow: '🔥 Hozir mavjud',
			h2: 'Dasturdan qanday foydalanish kerak?',
			h3: 'Trening 5 daqiqa davom etadi',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repudiandae harum numquam veritatis? Modi quibusdam aliquid quos veritatis',
			button: "Ko'rish"
		},
		TableOffenseTypes: {
			search: 'Qidirish...',
			name: 'Nomi',
			percentage: 'Foiz',
			fixedAmount: 'Belgilangan summa',
			action: 'Amallar',
			delete: "O'chirish",
			loading: 'Yurlanmoqda...'
		},
		inspectors: {
			name: 'FIO',
			login: 'Login',
			action: 'Amallar',
			edit: "O'zgartirish",
			delete: "O'chirish",
			button: "Inspektor qo'shish",
			noInspectors: "Inspektorlar yo'q",
			previous: 'Ortga',
			next: 'Keyingisi',
			addButton: "Qo'shish"
		}
	}
}
