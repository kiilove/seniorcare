// src/pages/AuthPage.js

import React from "react";
import Auth from "../components/Auth";
import { Layout } from "antd";

const { Content } = Layout;

const AuthPage = () => {
  console.log("first");
  return (
    <Layout
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content>
        <Auth />
      </Content>
    </Layout>
  );
};

export default AuthPage;
