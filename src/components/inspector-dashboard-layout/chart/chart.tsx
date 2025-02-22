import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

import { useLanguageStore } from '@/store/useLanguageStore'

import { translation } from '@/locales/locale'

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100
	}
]

export function Chart() {
	const { locale } = useLanguageStore()
	const t = translation[locale]

	return (
		<div className='mt-5 p-5 dark:bg-sidebar bg-[#A294F9] rounded-lg shadow-lg'>
			<h2 className='font-extralight mb-5 text-textSoft'>
				{t.statistics['weekly-review']}
			</h2>
			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<LineChart
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip contentStyle={{ background: '#151c2c', border: 'none' }} />
					<Legend />
					<Line
						type='monotone'
						dataKey='pv'
						stroke='#8884d8'
						strokeWidth={2}
					/>
					<Line
						type='monotone'
						dataKey='uv'
						stroke='#82ca9d'
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
