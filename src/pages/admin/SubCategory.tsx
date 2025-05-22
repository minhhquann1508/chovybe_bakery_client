import { useEffect, useState } from "react";
import type { SubCategoryType } from "../../types/subCategories";
import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";
import { CustomModal } from "../../components";
import { CategoryApi } from "../../apis/categories/categories";
import type { CategoryType } from "../../types/categories";
import { SubCategoryApi } from "../../apis/subCategories/subCategories";
import type { CustomAxiosError } from "../../types/axios";
import { formatDate } from "../../utils/helper";
import { Pencil, Trash } from "lucide-react";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const SubCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<SubCategoryType[] | []>(
    []
  );
  const [updateSubCategories, setUpdateSubCategories] =
    useState<SubCategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const fetchListSubCategories = async () => {
    setIsLoading(true);
    try {
      const res = await SubCategoryApi.getAll();
      setSubCategories(res.data.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchListSubCategories();
  }, []);

  useEffect(() => {
    fetchListCategories();
  }, []);

  useEffect(() => {
    if (updateSubCategories) {
      form.setFieldsValue(updateSubCategories);
      if (typeof updateSubCategories.category == "object")
        form.setFieldValue("category", updateSubCategories.category._id);
    } else {
      form.resetFields();
    }
  }, [form, updateSubCategories]);

  const columns: TableColumnsType<SubCategoryType> = [
    {
      title: "Tên danh mục",
      dataIndex: "subCategoryName",
    },
    {
      title: "Danh mục chính",
      dataIndex: "category",
      render: (category: CategoryType) => {
        const { categoryName } = category;
        return <p>{categoryName}</p>;
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
      render: (user) => {
        return <p>{user.email}</p>;
      },
    },
    {
      title: "Thao tác",
      align: "center",
      render: (value: SubCategoryType) => {
        const { _id } = value;
        return (
          <Space>
            <Button
              onClick={() => {
                // setUpdateCategory(value);
                setUpdateSubCategories(value);
                showModal();
              }}
            >
              <Pencil size={14} />
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Xoá danh mục con"
              description="Bạn chắc chắn muốn xoá chứ ?"
              //   onConfirm={() => handleDelete(_id)}
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: SubCategoryType) => {
    setIsLoading(true);
    try {
      if (updateSubCategories) {
        const { _id } = updateSubCategories;
        await SubCategoryApi.update(_id, values);
        messageApi.success("Thêm danh mục con thành công");
      } else {
        await SubCategoryApi.create(values);
        messageApi.success("Chỉnh sửa danh mục con thành công");
        form.resetFields();
      }
      setIsModalOpen(false);
      fetchListSubCategories();
    } catch (error) {
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
          Danh sách danh mục con
        </Title>
        <Button
          type="primary"
          onClick={() => {
            setUpdateSubCategories(null);
            showModal();
          }}
        >
          Thêm danh mục con
        </Button>
      </div>
      <Table<SubCategoryType>
        loading={isLoading}
        rowKey={"_id"}
        columns={columns}
        dataSource={subCategories}
      />
      <CustomModal
        title="Thêm danh mục con"
        visible={isModalOpen}
        setIsVisible={setIsModalOpen}
      >
        <Form onFinish={handleSubmit} {...formItemLayout} form={form}>
          <Form.Item
            label="Tên danh mục con"
            name="subCategoryName"
            rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
          >
            <Input placeholder="Nhập tên danh mục con" />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="label"
              options={categories.map((category) => {
                const { _id, categoryName } = category;
                return {
                  value: _id,
                  label: categoryName,
                };
              })}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" loading={isLoading} htmlType="submit">
              {updateSubCategories ? "Chỉnh sửa" : "Thêm ngay"}
            </Button>
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};

export default SubCategory;
