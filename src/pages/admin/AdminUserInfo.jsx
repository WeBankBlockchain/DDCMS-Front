import React from "react";
import { Badge, Descriptions, message, Image } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { QueryCompanyByUsernameApi } from "../../request/api";
import { DownloadFileApi } from "../../request/api";

export default function AdminUserInfo() {
  const [data, setData] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  const bindWithThirdParty = async (event) => {
    localStorage.setItem("thirdPartyOperation", "bind");
    const itemId = event.currentTarget.getAttribute('itemID')
    if (itemId === "github") {
      //使用github绑定
      window.location.href = "https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID;
    }else if (itemId === "wechat") {
      //使用微信绑定
      message.info("暂不支持");
    }
  }

  const OrgProfile = () =>
    data && (
      <Descriptions title="用户信息" bordered>
        <Descriptions.Item label="账户类型">机构</Descriptions.Item>
        <Descriptions.Item label="账户名称">
          {data.companyName}
        </Descriptions.Item>
        <Descriptions.Item label="证件类型">
          {data.companyCertType}
        </Descriptions.Item>
        <Descriptions.Item label="证件号码">
          {data.companyCertNo}
        </Descriptions.Item>
        <Descriptions.Item label="did" span={2}>
          {data.did}
        </Descriptions.Item>
        <Descriptions.Item label="私钥地址" span={3}>
          {data.privateKey}
        </Descriptions.Item>
        <Descriptions.Item label="开户日期" span={2}>
          {moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="审核状态">
          {data.status === 0 && <Badge status="default" text="未注册" />}
          {data.status === 1 && <Badge status="processing" text="审核中" />}
          {data.status === 2 && <Badge status="success" text="已审核" />}
          {data.status === 3 && <Badge status="error" text="已拒绝" />}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {data.companyContact}
        </Descriptions.Item>
        <Descriptions.Item label="证件图像" span={2}>
          {fileUrl && <Image width={200} src={fileUrl} />}
        </Descriptions.Item>
        <Descriptions.Item label="第三方账号">
          {/* 绑定GitHub */}
          <a itemID="github" onClick={bindWithThirdParty}><svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg></a>
          &nbsp;&nbsp;&nbsp;
          {/* 绑定微信(待支持) */}
          <a itemID="wechat" onClick={bindWithThirdParty}><svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 576 512"><path d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z" /></svg></a>
        </Descriptions.Item>
      </Descriptions>
    );

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const req = { userName: username };
    const fetchData = () => {
      queryApi(QueryCompanyByUsernameApi);
    };
    const handleDownload = async (filename) => {
      const params = { filename: filename };
      const response = await DownloadFileApi(params);
      const blob = await response;
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
    };
    const queryApi = (action) => {
      action(req)
        .then((res) => {
          if (res.code === 0) {
            console.log(res.data);
            setData(res.data);
            if (res.data.accountType !== "3") {
              handleDownload(res.data.companyCertFileUri);
            }
          } else {
            console.log(res);
            message.error("查询失败!");
            message.error(res.msg);
          }
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);

  return <OrgProfile />;
}
