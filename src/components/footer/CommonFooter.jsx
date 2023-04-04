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
        height: '3vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <div>DataBrain ©2023 Created by WeBank</div>
    
      

    </div>
  );
}
