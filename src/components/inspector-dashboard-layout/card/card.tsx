import { IStat } from './stat.interface'

export function Card({ item }: { item: IStat }) {
	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl flex gap-5 cursor-pointer hover:bg-[#7c70ca] mt-10'>
			<item.icon />
			<div className='flex flex-col gap-5 text-[10px] md:text-xs'>
				<span className=''>{item.label}</span>
				<span className='text-xl font-medium'>{item.value}</span>
			</div>
		</div>
	)
}
