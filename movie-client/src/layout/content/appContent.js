import React from 'react';
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import { DARK_COLOR } from '../../common/designConst'

const AppContent = () => {

   const { Content } = Layout;

   return (
      <Content
         style={{
            backgroundColor: DARK_COLOR
         }}
      >
         <Layout
            style={{
               padding: '24px 50px',
               backgroundColor: DARK_COLOR,
               minHeight: "80vh",
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