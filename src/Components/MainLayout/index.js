import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const { Sider, Content } = Layout;
const MainLayout = ({ children }) => {
  return (
    <Layout className={styles.mainLayout}>
      <Sider trigger={null}>
        <div className={styles.logo}>
          <img src="./Freddys_Logo.svg" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              label: <Link to="/orders">Orders</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
