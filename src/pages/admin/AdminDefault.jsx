import { GetMenuByRoleApi } from "../../request/api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//跳转页面
export default function AdminDefault(){
    const navigate = useNavigate();
  
    useEffect(() => {
      GetMenuByRoleApi({}).then((res) => {
        if (res.code === 0) {
          // console.log(res.data);
            const menus = res.data;
            const itemToDisplay = firstItem(menus);
            if (itemToDisplay){
                navigate(itemToDisplay.menuUrl);
            }

        } else {
          message.error(res.message);
        }
      });

      
    }, []);

    return (<div></div>)
}

function firstItem(menus){
    for (var i=0;i<menus.length;i++){
        const m = menus[i];
        if (m.children && m.children.length > 0){
            return m.children[0];
        }
    }
    return undefined;
}