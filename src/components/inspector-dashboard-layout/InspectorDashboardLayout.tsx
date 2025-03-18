import { PropsWithChildren } from 'react'

import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function InspectorDashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='bg-[#CDC1FF] dark:bg-bg text-bg dark:text-white grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr-6fr] md:grid-cols-[1fr_5fr] sm:grid-cols-1'>
			<Sidebar />
			<main className='p-big-layout overflow-x-hidden max-h-screen relative mt-5'>
				<Header />
				{children}
				<Footer />
			</main>
		</div>
	)
}
