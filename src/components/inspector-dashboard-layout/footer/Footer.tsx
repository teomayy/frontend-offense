import Link from 'next/link'

export function Footer() {
	return (
		<div className='flex items-center justify-between mt-8 dark:text-textSoft'>
			<Link
				className='cursor-pointer hover:text-white'
				href={'https://ibrokhimjon.vercel.app/'}
			>
				Ibrokhimjon dev
			</Link>
			<div>© All rights reserved</div>
		</div>
	)
}
