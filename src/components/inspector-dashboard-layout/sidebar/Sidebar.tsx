'use client'

import { useEffect, useState } from 'react'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { Profile } from './profile/Profile'

export function Sidebar() {
	const [isMobile, setIsMobile] = useState(false)
	const menuItems = MENU()

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	if (isMobile) {
		return (
			<nav className='fixed bottom-0 left-0 right-0 bg-[#A294F9] dark:bg-sidebar border-t  border-brandLinear dark:border-border flex justify-between p-1 z-20'>
				{menuItems.map(item => (
					<MenuItem
						item={item}
						key={item.link}
					/>
				))}
				<LogoutButton />
			</nav>
		)
	}

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
