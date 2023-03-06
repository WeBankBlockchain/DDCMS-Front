import CommonFooter from "../components/CommonFooter";
import HomeHeader from "../components/HomeHeader";
import React, { useEffect,useState } from 'react';
import { queryProductByIdApi } from '../request/api';
import { message } from 'antd';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    Layout,
  } from "antd";
const { Content } = Layout;


export default function ProductDetail({productId}) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState([]);
    const [initRefresh, setInitRefresh] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        message.success("提交成功");
      };
    
      // 表单提交失败的回调函数
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误");
    };

    useEffect(() => {
        const req = {
          productId: productId
        }
        queryProductByIdApi(req).then((res) => {
          if(res.code === '0'){
            setInitLoading(false);
            setData(res.data);
          }else{
            message.error(res.msg);
          }
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [initRefresh]);
  
    return (
        <Layout className="layout">
        <HomeHeader></HomeHeader>
        <Content
          style={{
            width: "100%",
            padding: 30,
            minHeight: 800,
            alignItems: "center",
            margin: "0 auto",
          }}
        >
         <div className="brain-form-page-title">
          <h1> 产品详情 </h1>
        </div>
        <div className="brain-form-page-bg">
        <div className="brain-form-page-main">
      <div>
        {editing ? ( // 编辑状态显示表单，非编辑状态显示内容
    
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              <Form.Item
                name="userType"
                rules={[{ required: true, message: "请选择用户类型" }]}
              >
        
              </Form.Item>

              <Form.Item
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: "请输入登录名！",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder={"请输入登录名"} />
              </Form.Item>


              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40PX", borderRadius: "12PX" }}
                >
                  同意协议并提交
                </Button>
              </Form.Item>
            </Form>
        ) : (
          <>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <Button
                type="primary"
                htmlType="submit"
                block
                style={{ height: "40PX", borderRadius: "12PX" }}
                onClick={() => setEditing(true)}>修改
            </Button>
          </>
        )}
         </div> 
         </div>
      </div>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
    );
  }