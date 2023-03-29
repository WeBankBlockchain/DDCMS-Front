import { Space, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function NotLoginUser() {
  const navigate = useNavigate();

  return (
    <Space
      wrap
      style={{
        float: "right",
      }}
    >
      <Button
        type="primary"
        onClick={() => {
          navigate("/login", {
            state: { homeFlag: 1 },
          });
        }}
      >
        登录
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
      >
        注册
      </Button>
    </Space>
  );
}
