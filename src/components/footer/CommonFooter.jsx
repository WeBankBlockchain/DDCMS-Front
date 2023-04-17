import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <div
      style={{
        width:'100%',
        backgroundColor: 'lightgrey',
        fontSize: '2vh',
        height: '10vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <span style={{
      }}>DataBrain ©2023 Created by WeBank</span>
    
      

    </div>
  );
}
