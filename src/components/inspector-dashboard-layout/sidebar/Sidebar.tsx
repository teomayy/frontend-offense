'use client'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { Profile } from './profile/Profile'

export function Sidebar() {
	const menuItems = MENU()

	return (
		<aside className='sticky top-10 min-h-screen flex flex-col justify-between dark:bg-sidebar bg-[#A294F9]'>
			<div>
				<Profile />
				<div className='p-3 relative'>
					{menuItems.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
					<LogoutButton />
				</div>
			</div>
		</aside>
	)
}
