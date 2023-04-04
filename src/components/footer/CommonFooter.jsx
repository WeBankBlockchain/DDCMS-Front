import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <div
      style={{
        width:'100%',
        backgroundColor: '#FFF',
        fontSize: '2vh',
        textAlign: "center",
        height: '3vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
      }}
    >
      <div>DataBrain ©2023 Created by WeBank</div>
    
      

    </div>
  );
}
