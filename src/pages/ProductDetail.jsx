import React, { useEffect,useState } from 'react';
import { queryProductByIdApi,updateProductApi } from '../request/api';
import { message } from 'antd';
import { useLocation } from 'react-router-dom'
import moment from 'moment'

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
const { TextArea } = Input;


export default function ProductDetail({}) {
    const [editing, setEditing] = useState(false);
    const [product, setProduct] = useState("");
    const [initRefresh, setInitRefresh] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [form] = Form.useForm();
    const [productId, setProductId] = useState("")

    //获取路由带过来的providerId
    const location = useLocation()
    if(location.state !== null && location.state.productId !== productId){
        setProductId(location.state.productId)
        setInitRefresh(!initRefresh)
    }

    useEffect(() => {
        const req = {
            productGid: productId
        }
        queryProductByIdApi(req).then((res) => {
          if(res.code === 0){
            setInitLoading(false);
            setProduct(res.data);
          }else{
            message.error(res.msg);
          }
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initRefresh]);


    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        updateProductApi(form).then((res) => {
            if(res.code === '0'){
                setEditing(false);
                setInitLoading(true);
                setProduct(res.data);
            }else{
                message.error(res.msg);
            }
        })

        message.success("提交成功");
      };
    
      // 表单提交失败的回调函数
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误");
    };

    return (
        <Layout className="layout">
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
        {
        editing ?
         ( // 编辑状态显示表单，非编辑状态显示内容
            <Form
              form={form}
              name="productDetail"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                maxWidth: 700,
                width: "100%",
                padding: 30,
                minHeight: 800,
                alignItems: "center",
                margin: "0 auto",
                marginTop: 30,
              }}
              scrollToFirstError
            >
              <Form.Item
                label="产品名称"
                name = "productName"
                rules={[
                    {
                      required: true,
                      message: "请输入产品名称！",
                      whitespace: true,
                    },
                ]}
              >
                <Input placeholder={product.productName} />
              </Form.Item>

              <Form.Item
                label="提供方名称"
                
              >
                 <label>{product.companyName} </label>
              </Form.Item>
              <Form.Item
                label="创建时间"
              >
                <label> {moment(product.createTime).format('YYYY-MM-DD')}</label>
              </Form.Item>
              <Form.Item
                label="详细描述"
                name = "information"
                rules={[
                    {
                      required: true,
                      message: "请输入产品详细描述",
                      whitespace: true,
                    },
                ]}
              >
                 <TextArea rows={4} placeholder={product.productDesc} maxLength={6} />
                {/* <Input placeholder={product.information} /> */}
              </Form.Item>

            

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40PX", borderRadius: "12PX" }}
                >
                  保存
                </Button>
              </Form.Item>
            </Form>
        ) 
        : (
          <>
            <Form
              style={{
                maxWidth: 700,
                width: "100%",
                padding: 30,
                minHeight: 800,
                alignItems: "center",
                margin: "0 auto",
                marginTop: 30,  
            }}
              scrollToFirstError
            >
              <Form.Item
                label="产品名称"
              >
                <label>{product.productName} </label>
              </Form.Item>

              <Form.Item
                label="提供方名称"
              >
                 <label>{product.companyName} </label>
              </Form.Item>
              <Form.Item
                label="创建时间"
              >
                <label> 
                {moment(product.createTime).format('YYYY-MM-DD')}
                </label>
                </Form.Item>

              <Form.Item
                label="详细描述"
              >
                <TextArea rows={4} placeholder={product.productDesc} maxLength={6} />
              </Form.Item>

            
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ height: "40PX", borderRadius: "12PX" }}
                onClick={() => setEditing(true)}>修改
            </Button>
            </Form>
          </>
        )
        }
         </div> 
         </div>
      </div>
      </Content>
    </Layout>
    );
  }