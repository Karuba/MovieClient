import { Button, Form, Input, Space } from 'antd';
import { NavLink } from 'react-router-dom'
import { userLogin } from '../redux/reducers/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/common/error'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AUTH } from '../redux/entitiesConst';

const LoginPage = () => {

   const { loading, userInfo, error } = useSelector((state) => state[AUTH])
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      console.log(userInfo);

      if (userInfo) {
         navigate('/profile')
      }
   }, [navigate, userInfo])

   const onFinish = (data) => {
      dispatch(userLogin(data))
   };

   return (
      <Space style={{ justifyContent: "center", alignItems: "center" }}>
         <Form
            name="login"
            labelCol={{
               span: 8,
            }}
            wrapperCol={{
               span: 16,
            }}
            style={{
               minWidth: 600,
               paddingRight: 120,
               paddingTop: 150,
            }}
            onFinish={onFinish}
            autoComplete="off"
         >
            {error && <Error>{error}</Error>}

            <Form.Item
               label="Username"
               name="userName"
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Password"
               name="password"
            >
               <Input.Password />
            </Form.Item>

            <Form.Item
               wrapperCol={{
                  offset: 8,
                  span: 16,
               }}
            >
               <p>If you don't have any accounts: <NavLink to="/register">Register</NavLink></p>
               <Button htmlType="submit" loading={loading}>
                  Login
               </Button>
            </Form.Item>
         </Form >
      </Space>
   )
};
export default LoginPage;