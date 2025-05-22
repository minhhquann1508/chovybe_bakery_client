import {
  Upload,
  type FormInstance,
  type UploadFile,
  type UploadProps,
} from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const FileUpload = ({
  form,
  image,
}: {
  form: FormInstance;
  image: string | undefined;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (image) {
      setFileList([
        {
          uid: "1",
          name: "image.png",
          url: image,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [image]);

  const handleChangeUploadFile: UploadProps["onChange"] = (info) => {
    const fileList = [...info.fileList];
    setFileList(fileList);
    const file = info.fileList[0];
    if (file?.status === "removed") {
      form.setFieldsValue({ image: "" });
    } else if (file?.status === "done") {
      const imageUrl = file.response.secure_url;
      form.setFieldsValue({ image: imageUrl });
    }
  };

  return (
    <Upload
      fileList={fileList}
      listType="picture-card"
      maxCount={1}
      action="https://api.cloudinary.com/v1_1/dtdkm7cjl/image/upload"
      data={{ upload_preset: "chovybe_present" }}
      onChange={handleChangeUploadFile}
      showUploadList={{ showRemoveIcon: true }}
    >
      {fileList.length >= 1 ? null : <Plus />}
    </Upload>
  );
};

export default FileUpload;
