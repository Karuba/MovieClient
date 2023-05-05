import { Link } from 'react-router-dom'
import { Button, Popconfirm, Avatar, Popover, Space } from 'antd'
import { LogoutOutlined, LoginOutlined, UserOutlined, UserAddOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { ANONYM, USER, ADMIN } from '../../redux/entitiesConst'
import { DARK_COLOR, LIGHT_COLOR, NIGHT_COLOR } from '../../common/designConst'
import * as axios from "../../lib/actionAxiosTypes";
import { useState } from 'react'


export const UserMenu = ({ userInfo, logoutHandler, avatar }) => {

   const [hover, setHover] = useState(false);

   const profile =
      <Link key="profile" to='/profile' style={{ color: "black" }} ><UserOutlined />  profile</Link>

   const adminPanel = {
      label: <Link to='/admin' ><UserAddOutlined />  admin panel</Link>
   }
   const logout = (logoutHandler) => (
      <Popconfirm key="logout" title="Are you sure to logout?" onConfirm={logoutHandler}>
         <Button danger key="logout" type="link" size='small' style={{ height: "100%", width: "100%", textAlign: "left", padding: 0 }}><LogoutOutlined />  logout</Button>
      </Popconfirm>
   )
   const login =
      <Link to='/login' style={{ color: LIGHT_COLOR, display: "flex", justifyContent: "space-around", alignItems: "center" }}><div style={{ verticalAlign: "center", marginRight: 5 }}>Login</div><div style={{ verticalAlign: "center", paddingTop: 2 }}><LoginOutlined /></div></Link>

   const auth = ({ userName }) => (
      <div style={{ color: LIGHT_COLOR, display: "flex", justifyContent: "space-around", alignItems: "center" }}><div style={{ verticalAlign: "center", marginRight: 5 }}>{userName}</div><div style={{ verticalAlign: "center" }}>{!!hover ? <DownOutlined /> : <UpOutlined />}</div></div>
   )

   const anonym = [
      login
   ]

   const user = [
      profile
   ]

   const admin = [
      adminPanel
   ]

   const rolePanel = {
      [ANONYM]: anonym,
      [USER]: user,
      [ADMIN]: admin,
   }

   const labelItems = (userName) =>
      !!userName ?
         <Space><Avatar src={avatar} style={{ backgroundColor: DARK_COLOR }} ><UserOutlined /></Avatar><span style={{ color: LIGHT_COLOR }}>{auth(userInfo)}</span></Space> :
         <Space><Avatar style={{ backgroundColor: DARK_COLOR }}><UserOutlined /></Avatar>{login}</Space>


   const content = (
      !!userInfo &&
      userInfo?.roles.reduce((arr, role) => {
         rolePanel[role]?.forEach((field) => {
            arr.unshift(
               field,
            )
         });
         return arr;
      }, [
         logout(logoutHandler)
      ])
   )

   return (
      <>
         {!!userInfo
            ?
            <Popover content={content} trigger="hover">
               <Button style={{ width: 130, height: 45, backgroundColor: NIGHT_COLOR }} type="simple" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >{labelItems(userInfo?.userName)}</Button>
            </Popover>
            : <Button style={{ width: 130, height: 45, backgroundColor: NIGHT_COLOR }} type="simple">{labelItems(userInfo?.userName)}</Button>
         }
      </>
   )
}