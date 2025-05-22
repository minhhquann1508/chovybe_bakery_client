import { Button, Form, Input, type FormInstance } from "antd";
// import FileUpload from "../fileUpload/FileUpload";
import { useEffect } from "react";

type LabelLayout = {
  labelCol: {
    xs: { span: number };
    sm: { span: number };
  };
  wrapperCol: {
    xs: { span: number };
    sm: { span: number };
  };
};

const CustomForm = ({
  formItemLayout,
  form,
  loading,
  onFinish,
}: {
  formItemLayout: LabelLayout;
  form: FormInstance;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (values: any) => Promise<void>;
}) => {
  const formItems = [
    {
      label: "Tên danh mục",
      name: "categoryName",
      rule: {
        required: true,
        message: "Vui lòng không bỏ trống",
      },
      type: "input",
      placeholder: "Nhập tên danh mục",
    },
    {
      label: "Mô tả",
      name: "description",
      rule: {
        required: true,
        message: "Vui lòng không bỏ trống",
      },
      type: "textarea",
      placeholder: "Nhập vào nội dung...",
    },
    {
      label: "Hình ảnh",
      name: "image",
      //   rule: {
      //     required: true,
      //     message: "Vui lòng không bỏ trống",
      //   },
      type: "file",
      placeholder: "Nhập vào nội dung...",
    },
  ];

  return (
    // <Form form={form} {...formItemLayout} onFinish={onFinish}>
    //   {formItems.map((item, index) => {
    //     const { label, name, type, placeholder } = item;
    //     return (
    //       <Form.Item key={index} label={label} name={name} rules={[rule]}>
    //         <CustomInput
    //           name={name}
    //           form={form}
    //           type={type}
    //           placeholder={placeholder}
    //         />
    //       </Form.Item>
    //     );
    //   })}
    //   <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
    //     <Button type="primary" loading={loading} htmlType="submit">
    //       Thêm ngay
    //     </Button>
    //   </Form.Item>
    // </Form>
    <></>
  );
};

// const CustomInput = ({
//   name,
//   type,
//   placeholder,
//   form,
// }: {
//   name: string;
//   type: string;
//   placeholder: string;
//   form: FormInstance;
// }) => {
//   useEffect(() => {
//     if (form.getFieldValue(name)) {
//       // Kiểm tra có đúng name không nếu có set lại cho
//       console.log("...");
//     } else {
//       console.log("///");
//     }
//   }, [form, name]);

//   switch (type) {
//     case "textarea":
//       return <Input.TextArea placeholder={placeholder} />;
//     // case "file":
//     //   return (
//     //     <FileUpload
//     //     //   fileList={fileList}
//     //     //   listType="picture-card"
//     //     //   maxCount={1}
//     //     //   action="https://api.cloudinary.com/v1_1/dtdkm7cjl/image/upload"
//     //     //   data={{ upload_preset: "chovybe_present" }}
//     //     //   onChange={handleChangeUploadFile}
//     //     //   showUploadList={{ showRemoveIcon: true }}
//     //     >
//     //       {/* {fileList.length >= 1 ? null : <Plus />} */}
//     //     </FileUpload>
//     //   );
//     default:
//       return <Input placeholder={placeholder} />;
//   }
// };

export default CustomForm;
