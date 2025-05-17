import { Tabs, Typography, Button, Form, Input, message, Checkbox } from "antd";
import type { TabsProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../../apis/user/user";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import type { CustomAxiosError } from "../../types/axios";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../../redux/features/auth/authSlice";
import { LOCAL_APP } from "../../utils/constant";
import type { RootState } from "../../redux/store";

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const CustomForm = ({
  action,
  setActiveKey,
}: {
  action: string;
  setActiveKey: (key: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // hàm xử lý sau khi nhấn đăng nhập
  const submitForm = async (
    values: { email: string; password: string },
    action: string
  ) => {
    let msg = "";
    setIsLoading(true);
    try {
      const { email, password } = values;
      if (action == "login") {
        const res = await login(email, password);
        msg = res.data.msg;
        const user = {
          accessToken: res.data.data.accessToken,
          role: res.data.data.user.role,
          id: res.data.data.user.id,
        };
        localStorage.setItem(
          LOCAL_APP.auth,
          JSON.stringify({ ...user, email: res.data.data.user.email })
        );
        dispatch(addAuth(user));
      } else {
        const res = await register(email, password);
        msg = res.data.msg;
      }
      messageApi.success(msg);
      form.resetFields();
      if (action === "login") {
        navigate("/");
      } else {
        setActiveKey("2");
      }
    } catch (error: unknown) {
      const err = error as CustomAxiosError;
      msg = err.response.data.msg;
      messageApi.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-3 px-5">
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={(values) => submitForm(values, action)}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          style={{ marginBottom: 12 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập vào email!" }]}
        >
          <Input size="large" placeholder="abc@gmail.com" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu của bạn"
          style={{ marginBottom: 12 }}
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Nhập vào mật khẩu của bạn"
          />
        </Form.Item>
        <p
          style={{
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Checkbox>
            <span style={{ fontSize: 14 }}>Ghi nhớ tài khoản</span>
          </Checkbox>
          <span style={{ fontSize: 14 }}>Quên mật khẩu?</span>
        </p>
        <Form.Item label={null} style={{ marginBottom: 12 }}>
          <Button
            loading={isLoading}
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            size="large"
          >
            {action === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
          </Button>
        </Form.Item>
        {/* Nút xử lý với Google */}
        <Form.Item label={null}>
          <Button style={{ width: "100%" }} type="default" size="large">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            <span>
              {action === "login"
                ? "Đăng nhập với Google"
                : "Đăng ký tài khoản với Google"}
            </span>
          </Button>
        </Form.Item>
        <p className="text-center" style={{ fontSize: 14 }}>
          Khi tiếp tục, bạn đồng ý với{" "}
          <Link style={{ fontSize: 14 }} to={"/"}>
            Điều khoản
          </Link>{" "}
          sử dụng và{" "}
          <Link style={{ fontSize: 14 }} to={"/"}>
            Chính sách
          </Link>{" "}
          bảo mật của chúng tôi.
        </p>
      </Form>
    </div>
  );
};

const AuthPage = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [activeKey, setActiveKey] = useState<string>("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Title
          level={5}
          style={{ marginBottom: 0, textTransform: "uppercase" }}
        >
          Đăng ký tài khoản
        </Title>
      ),
      children: <CustomForm action={"register"} setActiveKey={setActiveKey} />,
    },
    {
      key: "2",
      label: (
        <Title
          level={5}
          style={{ marginBottom: 0, textTransform: "uppercase" }}
        >
          Đăng nhập tài khoản
        </Title>
      ),
      children: <CustomForm action={"login"} setActiveKey={setActiveKey} />,
    },
  ];

  return (
    <>
      <section className="container mx-auto flex justify-center items-center">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          className="border border-neutral-300 rounded-md"
          style={{ width: 450 }}
          centered
          defaultActiveKey="1"
          items={items}
        />
      </section>
    </>
  );
};

export default AuthPage;
