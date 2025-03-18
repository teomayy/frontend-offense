'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { LogoutButton } from '../sidebar/LogoutButton'

import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { Profile } from './profile/Profile'

export function Sidebar() {
	const [isMobile, setIsMobile] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
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
			<>
				<button
					className='fixed bottom-5 right-5 z-30 p-3 bg-blueSecondary text-white rounded-full shadow-lg'
					onClick={() => setIsOpen(prev => !prev)}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				<AnimatePresence>
					{isOpen && (
						<motion.nav
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 100, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 120 }}
							className='fixed bottom-0 left-0 right-0 bg-[#A294F9] dark:bg-sidebar border-t border-brandLinear dark:border-border flex flex-col items-center py-3 z-20'
						>
							{menuItems.map(item => (
								<MenuItem
									item={item}
									key={item.link}
									onClick={() => setIsOpen(prev => !prev)}
								/>
							))}
							<LogoutButton />
						</motion.nav>
					)}
				</AnimatePresence>
			</>
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
