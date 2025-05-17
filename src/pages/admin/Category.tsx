import { useEffect, useState } from "react";
import { CategoryApi } from "../../apis/categories/categories";
import type { CategoryType } from "../../types/categories";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Typography,
  Upload,
  type TableColumnsType,
  type TableProps,
  type UploadProps,
} from "antd";
import { formatDate } from "../../utils/helper";
import { Pencil, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image.jpg";
import type { CustomAxiosError } from "../../types/axios";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Category = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const fetchListCategories = async () => {
    setIsLoading(true);
    try {
      const res = await CategoryApi.getAllCategories();
      setCategories(res.data.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListCategories();
  }, []);

  const columns: TableColumnsType<CategoryType> = [
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (value) => {
        if (value && value !== "") {
          return <Image width={50} src={value} />;
        } else {
          return <Image width={50} src={noImage} />;
        }
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (value) => {
        if (value && value !== "") {
          return <p className="w-[250px]">{value}</p>;
        } else {
          return <p>Chưa có mô tả</p>;
        }
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (value) => {
        return <span>{formatDate(value)}</span>;
      },
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Lần cuối cập nhật",
      dataIndex: "updatedAt",
      render: (value) => {
        return <span>{formatDate(value)}</span>;
      },
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      render: (value) => {
        return <Link to={"/"}>{value.email}</Link>;
      },
    },
    {
      title: "Thao tác",
      align: "center",
      render: (value: CategoryType) => {
        const { _id } = value;

        return (
          <Space>
            <Button>
              <Pencil size={14} />
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Xoá danh mục"
              description="Bạn chắc chắn muốn xoá chứ ?"
              onConfirm={() => handleDelete(_id)}
              // onCancel={cancel}
              okText="Xác nhận"
              cancelText="Huỷ"
            >
              <Button danger>
                <Trash size={14} />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<CategoryType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await CategoryApi.deleteCategory(id);
      messageApi.success("Xoá danh mục thành công");
      fetchListCategories();
    } catch (error) {
      const err = error as CustomAxiosError;
      messageApi.error(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUploadFile: UploadProps["onChange"] = (info) => {
    if (info.file.status === "removed") {
      form.setFieldsValue({ image: "" });
    } else if (info.file.status === "done") {
      const imageUrl = info.file.response.secure_url;
      form.setFieldsValue({ image: imageUrl });
    }
  };

  const handleSubmit = async (values: CategoryType) => {
    setIsLoading(true);
    try {
      await CategoryApi.addNewCategory(values);
      messageApi.success("Thêm danh mục thành công");
      form.resetFields();
      setIsModalOpen(false);
      fetchListCategories();
    } catch (error: unknown) {
      const err = error as CustomAxiosError;
      messageApi.error(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-between items-center mb-3">
        <Title level={5} style={{ textTransform: "uppercase" }}>
          Danh sách danh mục
        </Title>
        <Button type="primary" onClick={showModal}>
          Thêm danh mục
        </Button>
      </div>
      <Table<CategoryType>
        loading={isLoading}
        rowKey={"_id"}
        columns={columns}
        dataSource={categories}
        onChange={onChange}
      />
      <Modal
        title="Thêm danh mục"
        footer={null}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          initialValues={{ isActive: true, image: "" }}
        >
          <Form.Item
            label="Tên danh mục"
            name="categoryName"
            rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
          >
            <Input.TextArea placeholder="Nhập vào nội dung..." />
          </Form.Item>

          <Form.Item label="Hình ảnh" name="image">
            <Upload
              listType="picture-card"
              maxCount={1}
              action="https://api.cloudinary.com/v1_1/dtdkm7cjl/image/upload"
              data={{ upload_preset: "chovybe_present" }}
              onChange={handleChangeUploadFile}
            >
              <Plus />
            </Upload>
          </Form.Item>

          <Form.Item label="Trạng thái" name="isActive">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" loading={isLoading} htmlType="submit">
              Thêm ngay
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
