import React, { useEffect, useState } from "react";
import { Layout, Menu, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { GetMenuByRoleApi } from "../../request/api";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function AdminSlider(props) {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectKeys, setSelectKeys] = useState([]);
  useEffect(() => {
    GetMenuByRoleApi({}).then((res) => {
      if (res.code === 0) {
        // console.log(res.data);
        setMenus(res.data);
        const items = firstItem(res.data);
        setOpenKeys([items[0].menuId+'']);
        setSelectKeys([items[1].menuId+'']);
      } else {
        message.error(res.message);
      }
    });
  }, []);

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
          padding: '20px 2px',
          width: "100%",
          height: "100%",
          textAlign: "left",
        }}
        openKeys={openKeys}
        onOpenChange={_openKeys => {
          setOpenKeys([..._openKeys])
      }}
        selectedKeys={selectKeys}
        onSelect={key => {
          setSelectKeys([key])
      }}
        key="menu"
      >
        {menuDataToMenu(navigate, menus)}
      </Menu>
    </Sider>
  );
}

function menuDataToMenu(navigate, menuDatas) {
  const menus = [];
  for (const m of menuDatas) {
    if (m.children == null || m.children.length == 0) {
      const menuItem = (
        <Menu.Item key={m.menuId} onClick={() => navigate(m.menuUrl)}>
          {m.menuName}
        </Menu.Item>
      );
      menus.push(menuItem);
    } else {
      const items = menuDataToMenu(navigate, m.children);
      const subMenu = (
        <SubMenu key={m.menuId} title={m.menuName}>
          {items}
        </SubMenu>
      );

      menus.push(subMenu);
    }
  }
  return menus;
}


function firstItem(menus){
  if (!menus){
      return [undefined, undefined];
  }
  for (var i=0;i<menus.length;i++){
      const m = menus[i];
      if (m.children && m.children.length > 0){
          return [m, m.children[0]];
      }
  }
  return [undefined, undefined];
}