import { Breadcrumb, Layout, Menu, theme, Affix } from 'antd';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './appLayout.css'
import { userLogout, avatarDownload } from '../redux/reducers/authSlice'

import AppContent from './content/appContent'
/* import { menuItem } from './content/userMenu' */
import { DARK_COLOR, LIGHT_COLOR, NIGHT_COLOR } from '../common/designConst';
import logo from '../assets/camera.svg'

const { Header, Footer } = Layout;

const AppLayout = () => {
   /* const { userInfo, avatar } = useSelector((state) => state.auth)
   const dispatch = useDispatch();

   useEffect(() => {
      userInfo && dispatch(avatarDownload({ id: userInfo.id }));
   }, [userInfo]);

   const logoutHandler = () => {
      dispatch(userLogout());
   } */
   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Affix>
            <Header className="header" style={{ backgroundColor: NIGHT_COLOR, }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="pulsating-circle" style={{ height: 50 }}>
                     <Link to="/" style={{ padding: 0, margin: 0, height: 0, width: 0 }}>
                        <img src={logo} style={{ height: 50 }} alt='logo' />
                     </Link>
                  </div>
                  <div>
                  </div>
                  {/* <Menu
                     style={{
                        verticalAlign: 'middle',
                        color: LIGHT_COLOR,
                        backgroundColor: NIGHT_COLOR,
                        marginBottom: 35
                     }}
                     selectable={false}
                     mode="vertical"
                     items={menuItem(userInfo, logoutHandler, avatar)}
                  /> */}
               </div>
            </Header>
         </Affix>

         <AppContent />

         <Footer
            style={{
               textAlign: 'center',
               backgroundColor: LIGHT_COLOR,
               color: NIGHT_COLOR,
            }}
         >
            DA
         </Footer>
      </Layout>
   );
};
export default AppLayout;
