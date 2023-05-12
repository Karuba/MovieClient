import React from 'react';
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import { DARK_COLOR } from '../../common/designConst'
import "./appContent.css";

const AppContent = () => {

   const { Content } = Layout;

   return (
      <Content
         className='body-layout'
      >
         <Layout
            style={{
               backgroundColor: "rgb(186, 175, 175, 0)",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Outlet />
         </Layout>
      </Content>
   )
}

export default AppContent;