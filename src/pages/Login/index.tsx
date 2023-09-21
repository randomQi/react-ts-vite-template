import React from 'react'
import './index.scss'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate, Navigate } from 'react-router-dom'
const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	username?: string
	password?: string
	remember?: string
}
const Login: React.FC = () => {
	const item = sessionStorage.getItem('isLogin')
	if (item) {
		return <Navigate to="/"></Navigate>
	}
	const nav = useNavigate()
	const onFinish = () => {
		sessionStorage.setItem('isLogin', 'true')
		nav('/')
	}
	return (
		<div className="login_wrapper">
			<div className="form-wrapper">
				<Form
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 17 }}
					style={{ width: '80%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType> label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
						<Input />
					</Form.Item>

					<Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 6, span: 17 }}>
						<Button style={{ width: '100%' }} type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default Login
