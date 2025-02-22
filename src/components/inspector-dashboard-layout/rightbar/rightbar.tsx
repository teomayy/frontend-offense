import { PlaySquare } from 'lucide-react'
import Image from 'next/image'

export function RightBar() {
	return (
		<div className='fixed'>
			<div className='relative bg-gradient-to-t from-[#A294F9] to-[#A294F9] dark:from-[#182237] dark:to-[#253352] py-5 px-6 rounded-xl'>
				<div className='absolute bottom-0 right-0 w-[50%] h-[50%] '>
					<Image
						src='/astronaut.png'
						alt=''
						fill
						className='object-contain opacity-20'
					/>
				</div>
				<div className='flex flex-col gap-6'>
					<span className='font-bold'>🔥 Доступно сейчас</span>
					<h3 className='font-medium text-xs text-textSoft'>
						Как пользоваться программой?
					</h3>
					<span className='text-textSoft font-medium text-xs'>
						Обучение занимает 5 минут
					</span>
					<p className='text-textSoft text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
						repudiandae harum numquam veritatis? Modi quibusdam aliquid quos
						veritatis
					</p>
					<button className='p-3 flex items-center gap-3 bg-[#5d57c9] text-white border-none rounded cursor-pointer w-max'>
						<PlaySquare />
						Смотреть
					</button>
				</div>
			</div>
			<div className='mt-5 relative bg-gradient-to-t from-[#A294F9] to-[#A294F9] dark:from-[#182237] dark:to-[#253352] py-5 px-6 rounded-xl'>
				<div className='flex flex-col gap-6'>
					<span className='font-bold'>🔥 Доступно сейчас</span>
					<h3 className='font-medium text-xs text-textSoft'>
						Как пользоваться программой?
					</h3>
					<span className='text-textSoft font-medium text-xs'>
						Обучение занимает 5 минут
					</span>
					<p className='text-textSoft text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
						repudiandae harum numquam veritatis? Modi quibusdam aliquid quos
						veritatis
					</p>
					<button className='p-3 flex items-center gap-3 bg-[#5d57c9] text-white border-none rounded cursor-pointer w-max'>
						<PlaySquare />
						Смотреть
					</button>
				</div>
			</div>
		</div>
	)
}
