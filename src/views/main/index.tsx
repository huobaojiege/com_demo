/**
 * 主页入口
 */
import React, { useState, Suspense } from "react";

import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "../../component/sidebar";
import Header from "../../component/header";

import "./style.less";
const { Content } = Layout;
const HomeMainPage: React.FC = function () {
  const [collapsed] = useState(false);

  // function handleToggleCollapsed() {
  //   setCollapsed(!collapsed)
  //   localStorage.setItem(
  //     SIDEBAR_COLLAPSED,
  //     Number(collapsed) + ''
  //   )
  // }

  return (
    <section className="home-main">
      <Layout>
        <Header />
        <Layout className="home-layout">
          <Sidebar />
          <Content id="container">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </section>
  );
};

export default HomeMainPage;
