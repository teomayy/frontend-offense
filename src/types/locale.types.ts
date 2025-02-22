export type StatisticsTranslation = {
	offenses: string
	'paid-offenses': string
	pending: string
	'last-transaction': string
	name: string
	status: string
	date: string
	amount: string
	'weekly-review': string
}

export type LocaleMessages = {
	title: string
	description: string
	menu: {
		home: string
		inspectors: string
		offenses: string
		settings: string
	}
	auth: {
		auth: string
		login: string
		logout: string
		'log-in': string
		password: string
	}
	offense: {
		name: string
		date: string
		amount: string
		status: string
		action: string
	}
	'add-offense': {
		name: string
		phone: string
		'choose-offense': string
		baseSalary: string
		'add-offense': string
	}
	statistics: StatisticsTranslation
}
