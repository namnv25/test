import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.scss";
const { Sider, Content } = Layout;
const MainLayout = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const activeKey = location.pathname === "/orders" ? "2" : "1";
  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
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
          selectedKeys={[`${activeKey}`]}
          items={[
            {
              key: "1",
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              label: <Link to="/orders">Orders</Link>,
            },
            {
              key: "3",
              label: "Logout",
              onClick: onLogout,
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
