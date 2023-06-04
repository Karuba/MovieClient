import { Breadcrumb, Layout, Menu, theme, Affix, Popover, Button } from 'antd';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './appLayout.css'
import { userLogout, avatarDownload } from '../redux/reducers/authSlice'

import AppContent from './content/appContent'
import { UserMenu } from './content/userMenu'
import { DARK_COLOR, LIGHT_COLOR, NIGHT_COLOR } from '../common/designConst';
import logo1 from '../assets/camera.svg'
import logo2 from '../assets/Premium Cinema.svg'
import SearchBar from '../components/common/search/searchBar';
const { Header, Footer } = Layout;

const AppLayout = () => {
   const { userInfo, avatar } = useSelector((state) => state.auth)
   const dispatch = useDispatch();

   /* useEffect(() => {
      userInfo && dispatch(avatarDownload({ id: userInfo.id }));
   }, [userInfo]); */

   const logoutHandler = () => {
      dispatch(userLogout());
   }
   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Affix>
            <Header className="header" style={{ backgroundColor: NIGHT_COLOR, }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
                  <div className="logo-box" style={{ height: 45 }}>
                     <Link to="/" style={{ padding: 0, margin: 0, height: 0, width: 0 }}>
                        <img src={logo1} style={{ height: 40, marginRight: 10 }} alt='logo' />
                        <img src={logo2} style={{ height: 40 }} alt='logo' />
                     </Link>
                  </div>
                  <div style={{ width: "75%", paddingLeft: 30 }}>
                     <SearchBar />
                  </div>
                  {/* <Menu
                     style={{
                        verticalAlign: 'center',
                        color: LIGHT_COLOR,
                        backgroundColor: NIGHT_COLOR,
                     }}
                     selectable={false}
                     mode="vertical"
                     items={menuItem(userInfo, logoutHandler, avatar)}
                  /> */}
                  <UserMenu userInfo={userInfo} logoutHandler={logoutHandler} avatar={avatar} />
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
