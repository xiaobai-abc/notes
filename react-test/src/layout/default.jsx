import { Outlet } from "react-router-dom";
import { Layout, Message } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./default.module.less";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

function LayoutDefault({ children }) {
  // menu 是否折叠
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.defaultLayout}>
      <Header>
         zxczx
      </Header>
      <Layout>
        <Sider
          width={220}
          style={{
            position: "relative",
            zIndex: 210,
          }}
          collapsed={isCollapsed}
        >
          <div className={styles.sider}></div>
        </Sider>
        <Content className={styles.content}>
          {/* <Breadcrumb></Breadcrumb> */}
          {/* 目前只有notfound页面需要给layout传参  */}
          {/* 主要部分 */}
          <Render children={children}></Render>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutDefault;

function Render({ children }) {
  if (children) {
    return children;
  }
  return <Outlet />;
}
