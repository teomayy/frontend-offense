export function Transactions() {
	return (
		<div className='dark:bg-sidebar bg-[#A294F9] p-5 rounded-xl'>
			<h2 className='font-extralight text-textSoft'>Последние транзакции</h2>
			<table className='w-full'>
				<thead>
					<tr>
						<td className='p-3'>Имя</td>
						<td className='p-3'>Статус</td>
						<td className='p-3'>Дата и время</td>
						<td className='p-3'>Сумма</td>
					</tr>
				</thead>
				<tbody>
					<tr className='border-t border-gray-700 hover:bg-[#7c70ca] dark:hover:bg-gray-700'>
						<td className='p-3'>Асрор Амиров</td>
						<td className='p-3'>
							<span className='rounded-md p-2 text-xs bg-[#f7cb7375] text-center'>
								В ожидании
							</span>
						</td>
						<td className='p-3'>13.03.2025</td>
						<td className='p-3'>300.000 Сум</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
