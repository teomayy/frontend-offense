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
			password: 'Пароль',
			success: 'Успешный вход!',
			error: 'Неверный логин или пароль',
			logoutModal: 'Вы уверены, что хотите выйти?',
			cancel: 'Отмена'
		},
		offense: {
			name: 'ФИО',
			phone: 'Номер телефона',
			date: 'Дата штрафа',
			amount: 'Сумма',
			discountAmount: 'Сумма со скидкой',
			status: 'Статус',
			action: 'Действия',
			search: 'Поиск штрафа...',
			addTypeOffense: 'Добавить тип штрафа',
			addOffense: 'Добавить штраф',
			pending: 'Ожидает оплаты',
			paid: 'Оплачен',
			deleting: 'Удалить',
			pendingDeleting: 'Удаление...',
			deleted: 'Штраф удалён!',
			error: 'Не удалось удалить штраф',
			deleteMessage: 'Вы уверены, что хотите удалить?',
			cancel: 'Отмена',
			allStatuses: 'Все штрафы',
			allInspectors: 'Все Инспекторы',
			notFound: 'Штрафов не найдено',
			back: 'назад',
			historyTitle: 'История изменений',
			dateLog: 'Дата',
			historyNotFound: 'История не найдена',
			logs: 'Логи'
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
			archivedFines: 'Оплата ожидается',
			offense: 'Всего штрафа',
			'paid-offenses': 'Оплаченные штрафы',
			pending: 'Ожидает оплаты',
			'last-transaction': 'Последние транзакции',
			name: 'ФИО',
			pendingTransaction: 'В ожидании',
			paidTransaction: 'Оплачен',
			deletedTransaction: 'Не оплачен',
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
			addButton: 'Добавить',
			password: 'Пароль',
			pending: 'Добавление...',
			loginRequired: 'Введите логин',
			passwordRequired: 'Введите пароль',
			success: 'Инспектор добавлен успешно',
			error: 'Не удалось добавить инспектора'
		},
		editInspector: {
			update: 'Обновить',
			updating: 'Обновление...',
			success: 'Данные инспектора обновлены!',
			error: 'Не удалось обновить данные!',
			loadingError: 'Инспектор не найден!'
		},
		PaymentPage: {
			title: 'Выберите способ оплаты',
			button: 'Оплатить',
			success: 'Оплата успешно создана',
			error: 'Ошибка при создании платежа'
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
			password: 'Parol',
			success: 'Muvaffaqiyatli kirish!',
			error: "Login yoki parol nato'g'ri",
			logoutModal: 'Chiqishga ishonchingiz komilmi?',
			cancel: 'Bekor qilish'
		},
		offense: {
			name: 'FIO',
			phone: 'Telefon raqam',
			date: 'Jarima sanasi',
			amount: 'Miqdori',
			discountAmount: 'Chegirma miqdori',
			status: 'Holat',
			action: 'Amallar',
			search: 'Jarima qidirish...',
			addTypeOffense: "Jarima turini qo'shish",
			addOffense: "Jarima qo'shish",
			pending: "To'lov kutulmoqda",
			paid: "To'langan",
			pendingDeleting: "O'chirilmoqda..",
			deleting: "O'chirish",
			deleted: "Jarima o'chirildi!",
			error: "Jarimani o'chirilmadi!",
			deleteMessage: 'Haqiqatan ham oʻchirib tashlamoqchimisiz?',
			cancel: 'Chiqish',
			allStatuses: 'Barcha jarimalar',
			allInspectors: 'Barcha Inspectorlar',
			notFound: 'Jarimalar topilmadi',
			back: 'ortga',
			historyTitle: "O'zgarishlar tarixi",
			dateLog: 'Sana',
			historyNotFound: 'Tarix topilmadi',
			logs: 'Loglar'
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
			loading: 'Yuklanmoqda...'
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
			addButton: "Qo'shish",
			password: 'Parol',
			pending: "Qo'shilmoqda...",
			loginRequired: 'Login kiritish shart',
			passwordRequired: 'Parol kiritish shart',
			success: "Inspektor muvaffaqiyatli qo'shildi",
			error: 'Inspektor qo‘shib bo‘lmadi'
		},
		editInspector: {
			update: 'Yangilash',
			updating: 'Yangilanmoqda...',
			success: "Inspektor ma'lumotlari yangilandi!",
			error: 'Maʼlumotlarni yangilab boʻlmadi!',
			loadingError: 'Inspektor topilmadi!'
		},
		PaymentPage: {
			title: "To'lov usulini tanlang",
			button: "To'lash",
			success: 'Toʻlov muvaffaqiyatli yaratildi',
			error: 'Toʻlovni yaratishda xatolik yuz berdi'
		}
	}
}
