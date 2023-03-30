import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <Footer
      style={{
        backgroundColor: '#F6F6F6',
        fontSize: '20px',
        textAlign: "center",
      }}
    >
      DataBrain ©2023 Created by WeBank
    </Footer>
  );
}
