class DASHBOARD {
	private readonly root = '/v1'

	HOME = this.root
	HOME_ADMIN = `${this.root}/admin-dashboard`
	INSPECTORS = `${this.HOME_ADMIN}/inspectors`
	ADMIN_OFFENSE = `${this.HOME_ADMIN}/offense`
	SETTINGS_ADMIN = `${this.HOME_ADMIN}/settings`

	HOME_INSPECTOR = `${this.root}/inspector-dashboard`
	INSPECTOR_OFFENSE = `${this.HOME_INSPECTOR}/offense`
	SETTINGS_INSPECTOR = `${this.HOME_INSPECTOR}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()
