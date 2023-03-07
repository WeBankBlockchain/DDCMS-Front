import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { baseURL } from "../request/service.js";

const url = baseURL + "file/upload";

export default function FileUploader(props) {

  const uploadFile = (file) => {
    // create a FormData object
    const formData = new FormData();
    // append the file to the formData
    formData.append("file", file);
    return formData;
  };

  const params = {
    name: "file",
    action: url,
    mutiple: false,
    data: { uploadFile },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const name = info.file.response.data;
        message.success(`${info.file.name} 文件已上传成功`);
        props.onFileChange(name);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  };

  return (
    <Upload {...params}>
      <Button icon={<UploadOutlined />}> {props.label}</Button>
    </Upload>
  );
}
