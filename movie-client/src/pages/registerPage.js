import { Button, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/common/error'
import { registerUser, setSuccess } from '../redux/reducers/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AUTH } from '../redux/entitiesConst';
import { passwordConfirm, passwordValidation, userNameValidation } from '../redux/contracts/authContracts';

const RegisterPage = () => {
   const dispatch = useDispatch()
   const { loading, userInfo, error, success } = useSelector((state) => state[AUTH]);
   const navigate = useNavigate()


   /* const commonRules = {
      required: true,
      whitespace: true,
      min: 3,
   };

   const noWhiteSpace = {
      validator: (_, value) =>
         !value?.includes(" ")
            ? Promise.resolve()
            : Promise.reject(new Error("No spaces allowed"))
   } */

   useEffect(() => {

      if (success) { navigate('/login'); dispatch(setSuccess(false)); }

      //if (userInfo) navigate('/user-profile')
   }, [navigate, userInfo, success])


   const onFinish = (data) => {
      console.log('ONFINISH!!!!', data);

      dispatch(registerUser(data))
   };

   return (
      <Space style={{ justifyContent: "center", alignItems: "center" }}>
         <Form
            labelCol={{
               span: 8,
            }}
            wrapperCol={{
               span: 16,
            }}
            style={{
               minWidth: 600,
               paddingRight: 110,
               paddingTop: 100,
            }}
            onFinish={onFinish}
            autoComplete="off"
         >
            {error && <Error>{error}</Error>}
            <Form.Item
               label="Username"
               name="userName"
               rules={
                  userNameValidation
               }
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Password"
               name="password"
               rules={
                  passwordValidation
               }
            >
               <Input.Password />
            </Form.Item>
            <Form.Item
               label="Confirm Password"
               name="confirmPassword"
               rules={
                  passwordConfirm
               }
            >
               <Input.Password />
            </Form.Item>

            <Form.Item
               style={{ display: "flex", justifyContent: "right" }}
            >
               <Button htmlType="submit" loading={loading}>
                  SignUp
               </Button>
            </Form.Item>
         </Form>
      </Space>
   )
};
export default RegisterPage;