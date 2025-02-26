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
			<div className='p-5 top-big-layout left-big-layout'>
				{isLoading ? (
					<span>...Loading</span>
				) : (
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 flex justify-center items-center text-2xl dark:text-white dark:bg-primary bg-[#E5D9F2] rounded uppercase'>
							{data?.inspector.name.charAt(0) || 'A'}
						</div>
						<div className=' text-left mr-3'>
							<p className='font-bold -mb-1'>{data.inspector.name}</p>
							<p className='text-sm opacity-40'>{data.inspector.login}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
