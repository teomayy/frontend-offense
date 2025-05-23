interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div className='md:block hidden'>
			<h2 className='text-xs sm:text-2xl text-black dark:text-textSoft font-medium'>
				{title}
			</h2>
		</div>
	)
}
