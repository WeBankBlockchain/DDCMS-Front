import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <Footer
      style={{
        backgroundColor: '#FFF',
        fontSize: '20px',
        textAlign: "center",
      }}
    >
      DataBrain ©2023 Created by WeBank
    </Footer>
  );
}
