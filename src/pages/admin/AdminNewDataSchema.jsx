import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  message,
  Select,
  DatePicker,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";
import {
  NewDataSchemaApi,
  GetProductsByProviderIdApi,
} from "../../request/api";

const { Option } = Select;

export default function AdminNewDataSchema() {
  const navigate = useNavigate();
  //各类状态
  const [tags, setTags] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  //回调
  const onSubmit = (values) => {
    console.log(values);
    var request = {
      dataSchemaName: values.dataSchemaName,
      productId: values.dataSchemaProductId, //todo
      tagNameList: tags,
      version: values.dataSchemaVersion,
      visible: values.dataSchemaVisible,
      dataSchemaDesc: values.dataSchemaDesc,
      dataSchemaUsage: values.dataSchemaUsage,
      price: values.price,
      dataFormat: values.dataSchemaFormat,
      dataProtocol: values.dataSchemaProtocol,
      contentSchema: values.dataSchemaContentSchema,
      accessCondition: values.dataSchemaAccessCondition,
      uri: values.dataSchemaUrl,
      effectTime: values.dataSchemaTimeRange[0].valueOf(),
      expireTime: values.dataSchemaTimeRange[1].valueOf(),
    };
    console.log(request);
    NewDataSchemaApi(request).then((res) => {
      if (res.code === 0) {
        message.info("创建成功，审核中");
        navigate(-1);
      } else {
        message.error(res.msg);
      }
    });
  };

  const loadMyProducts = () => {
    GetProductsByProviderIdApi({}).then((res) => {
      if (res.code === 0) {
        setMyProducts(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误:");
  };

  const layout = {
    labelCol: { span: 24 }, // Use the full width of the form item for the label
    wrapperCol: { span: 24 }, // Use the full width of the form item for the input
  };

  const validateJSON = (_, value) => {
    try {
      const parsedValue = JSON.parse(value);
      if (typeof parsedValue !== 'object') {
        return Promise.reject('Please enter valid JSON');
      }
    } catch (error) {
      return Promise.reject('Please enter valid JSON');
    }
    return Promise.resolve();
  };
  
  return (
    <Layout>
      <Content
        style={{
          width: "100%",
          padding: 30,
          minHeight: 800,
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="brain-form-page-bg">
          <div className="brain-form-page-title">
            <h1> 创建数据目录 </h1>
          </div>
          <div
            className="brain-form-page-main"
            {...layout}
            style={{
              width: "100%",
            }}
          >
            <Form
              name="create-schema"
              className="create-schema"
              // initialValues={{}
              onFinish={onSubmit}
              onFinishFailed={onFinishFailed}
              style={{
                maxWidth: "600px",
              }}
              {...layout}
            >
              <Card
                title="基本信息"
                headStyle={{ textAlign: "left", fontSize: "25px" }}
              >
                <Form.Item
                  label="目录名称"
                  name="dataSchemaName"
                  rules={[
                    { required: true, message: "请输入数目目录名称" },
                    { pattern: "^[^ ]+$", message: "名称不能有空格" },
                  ]}
                >
                  <Input placeholder="请输入数据目录名称" />
                </Form.Item>
                <Form.Item
                  label="所属产品"
                  name="dataSchemaProductId"
                  rules={[{ required: true, message: "请输入所属产品名称" }]}
                >
                  <Select placeholder="请选择产品" onClick={loadMyProducts}>
                    {myProducts.map((p) => {
                      return (
                        <Option value={p.pkId} style={{ textAlign: "center" }}>
                          {p.productName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="dataSchemaDesc"
                  label="描述"
                  rules={[
                    { required: true, message: "请输入目录描述信息" },
                    { pattern: "^[^ ]+$", message: "密码不能有空格" },
                  ]}
                >
                  <Input.TextArea placeholder="请输入目录描述信息，不超过500字" />
                </Form.Item>
                <Row gutter={18}>
                  <Col span={12}>
                    <Form.Item
                      label="数据是否可见"
                      name="dataSchemaVisible"
                      required
                    >
                      <Select placeholder="数据可见性">
                        <Option value="1">数据公开可见</Option>
                        <Option value="0">仅对我可见</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="dataSchemaVersion"
                      label="版本号"
                      defaultValue={0}
                      required
                      rules={[
                        { required: true, message: "请输入目录版本号" },
                        {
                          validator(_, value) {
                            if (!value || Number.isInteger(Number(value))) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("请输入整数"));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入版本号,请输入整数" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="dataSchemaTags" label="标签">
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    separators={[" "]}
                    placeHolder="输入标签，空格作为分割"
                  />
                </Form.Item>
                <Form.Item name="dataSchemaUsage" label="数据用途" required>
                  <Input.TextArea
                    placeholder="请输入数据用途,不得超过500字"
                    bordered={true}
                  />
                </Form.Item>

                <Form.Item name="price" label="价格(rmb)" required>
                  <Input placeholder="请输入价格,例如300.00" bordered={true} />
                </Form.Item>
              </Card>
              <Divider></Divider>
              <Card
                title="数据传输信息"
                headStyle={{ textAlign: "left", fontSize: "25px" }}
              >
                <Row gutter={18}>
                  <Col span={12}>
                    <Form.Item
                      label="数据传输协议"
                      name="dataSchemaProtocol"
                      required
                    >
                      <Select placeholder="数据传输协议">
                        <Option value="0">HTTP</Option>
                        <Option value="1">HTTPS</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="数据格式"
                      name="dataSchemaFormat"
                      required
                    >
                      <Select placeholder="请输入数据内容格式">
                        <Option value="0">JSON</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="数据url" name="dataSchemaUrl" required>
                  <Input placeholder="请输入数据访问Url" bordered={true} />
                </Form.Item>
                <Form.Item
                  label="响应结构"
                  name="dataSchemaContentSchema"
                  rules={[{ required: true, validator: validateJSON }]}
                >
                  <Input.TextArea
                    placeholder="请输入响应结构,格式为json"
                    bordered={true}

                  />
                </Form.Item>
                <Form.Item
                  label="查询条件"
                  name="dataSchemaAccessCondition"

                  rules={[{ required: true, validator: validateJSON }]}
                >
                  <Input.TextArea
                    placeholder="请输入查询条件,格式为json"
                    bordered={true}
                    
                  />
                </Form.Item>

                <Form.Item label="有效日期" name="dataSchemaTimeRange" required>
                  <DatePicker.RangePicker
                    placeholder={["生效日期", "结束日期"]}
                  />
                </Form.Item>
              </Card>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40PX", borderRadius: "12PX" }}
                >
                  创建目录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
