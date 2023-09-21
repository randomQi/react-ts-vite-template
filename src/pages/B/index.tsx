import { useEffect, useState } from 'react'
import { getRandomPic } from '@/apis/pexels'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
interface DataType {
	key: string
	name: string
	age: number
	address: string
	tags: string[]
}

const columns: (
	| { dataIndex: string; title: string; render: (text) => JSX.Element; key: string }
	| { dataIndex: string; title: string; key: string }
	| { dataIndex: string; title: string; key: string }
	| { dataIndex: string; title: string; render: (_, { tags }: { tags: any }) => JSX.Element; key: string }
	| { title: string; render: (_, record) => JSX.Element; key: string }
)[] = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: '标签',
		key: 'tags',
		dataIndex: 'tags',
		render: (columData, rowData) => (
			<>
				{rowData.tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green'
					if (tag === 'loser') {
						color = 'volcano'
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					)
				})}
			</>
		),
	},
	{
		title: '操作',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<a>添加{record.name}</a>
				<a>删除</a>
			</Space>
		),
	},
]

const data: DataType[] = [
	{
		key: '1',
		name: 'admin',
		age: 32,
		address: '..........',
		tags: ['管理员', '普通用户'],
	},
	{
		key: '2',
		name: 'test1',
		age: 42,
		address: '..........',
		tags: ['普通用户'],
	},
	{
		key: '3',
		name: 'test2',
		age: 32,
		address: '..........',
		tags: ['管理员', '普通用户'],
	},
]
export default function B() {
	const [img, setImg] = useState()
	// useEffect(() => {
	// 	async function asinit() {
	// 		const {
	// 			src: { landscape },
	// 		} = await getRandomPic()
	// 		setImg(landscape)
	// 	}
	// 	asinit()
	// }, [])
	return (
		<div style={{ backgroundImage: `url(${img})`, height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
			<Table columns={columns} dataSource={data} />
		</div>
	)
}
