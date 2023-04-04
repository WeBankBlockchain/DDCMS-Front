import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        width:'100%',
        backgroundColor: '#FFF',
        fontSize: '20px',
        textAlign: "center",
        height: '30px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
      }}
    >
      <div>DataBrain ©2023 Created by WeBank</div>
    
      
      

    </div>
  );
}
