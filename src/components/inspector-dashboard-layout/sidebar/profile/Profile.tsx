import { useInspectorProfile } from '@/hooks/useInspectorProfile'

export function Profile() {
	const { data, isLoading, error, refetch } = useInspectorProfile()

	if (isLoading) return <p className='text-gray-500'>Загрузка профиля...</p>
	if (error)
		return (
			<div className='text-red-500'>
				Ошибка: Профиль не найден!
				<button
					className='bg-red-500 text-white p-2 rounded ml-2'
					onClick={() => refetch()}
				>
					Повторить попытку
				</button>
			</div>
		)

	if (!data?.inspector)
		return <p className='text-red-500'>Ошибка: Данные не загружены</p>

	return (
		<div>
			<div className='md:p-5 p-1 top-big-layout left-big-layout'>
				{isLoading ? (
					<span>...Loading</span>
				) : (
					<div className='flex items-center gap-3'>
						<div className='md:w-10 md:h-10 w-5 h-5 flex justify-center items-center md:text-2xl dark:text-white dark:bg-primary bg-[#E5D9F2] rounded uppercase'>
							{data?.inspector.name.charAt(0) || 'A'}
						</div>
						<div className='text-left mr-3 text-[9px] md:text-xs'>
							<p className='font-bold -mb-1'>{data.inspector.name}</p>
							<p className='md:text-sm opacity-40 text-[9px]'>
								{data.inspector.login}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
