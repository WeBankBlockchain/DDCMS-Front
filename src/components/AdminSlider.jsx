import React, { useEffect,useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu ,message } from "antd";
import { Link } from 'react-router-dom';
import { GetMenuByRoleApi } from "../request/api";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;




export default function AdminSlider(props) {

  const [menus, setMenus] = useState([]);


  useEffect(
    GetMenuByRoleApi({}).then(res=>{
      if (res.code === 0){
        setMenus(res.data);
      } else{
        message.error(res.message);
      }
    })  
    ,[]
  )

  return (
    <Sider
      style={{
        background: props.background,
      }}
      width={200}
    >
      <Menu
        mode="inline"
        style={{
          height: "100%",
        }}
      >

      </Menu>
    </Sider>
  );
}
