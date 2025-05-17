import {
  Button,
  Col,
  Dropdown,
  message,
  Row,
  Typography,
  type MenuProps,
} from "antd";
import logoImg from "../../assets/logo.png";
import type React from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../apis/user/user";
import { LOCAL_APP } from "../../utils/constant";

const { Title } = Typography;

const titleItemStyle: React.CSSProperties = {
  fontWeight: 600,
  textTransform: "uppercase",
  textAlign: "center",
  fontSize: 15,
  cursor: "pointer",
};

const titleClassStyle: string = "hover:!text-blue-500 duration-150";

const MainHeader = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    try {
      const response = await logout();
      messageApi.open({
        type: "success",
        content: response.data.msg,
      });
      setTimeout(() => {
        localStorage.removeItem(LOCAL_APP.auth);
        window.location.reload();
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      messageApi.open({
        type: "error",
        content: "Đăng xuất không thành công",
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/profile"}>Thông tin tài khoản</Link>,
    },
    {
      key: "2",
      label: <Link to={"/profile"}>Đổi mật khẩu</Link>,
    },
    {
      key: "3",
      label: <Link to={"/profile"}>Lịch sử mua hàng</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

  // Xử lý khi đăng nhập đổi nút user
  const renderUserButton = () => {
    if (!token) {
      return (
        <Button
          type="default"
          size="large"
          shape="circle"
          onClick={() => navigate("/auth")}
          icon={<User size={17} />}
        />
      );
    } else {
      return (
        <Dropdown menu={{ items }} placement="bottom">
          <Button
            type="default"
            size="large"
            shape="circle"
            icon={<User size={17} />}
          />
        </Dropdown>
      );
    }
  };

  return (
    <header className="shadow-xs">
      {contextHolder}
      <Row className="container items-center" align={"middle"}>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <Row align={"middle"}>
            <Col span={8}>
              <Title
                className={titleClassStyle}
                level={5}
                style={titleItemStyle}
                onClick={() => navigate("/")}
              >
                Trang chủ
              </Title>
            </Col>
            <Col span={8}>
              <Title
                className={titleClassStyle}
                level={5}
                style={titleItemStyle}
              >
                sản phẩm
              </Title>
            </Col>
            <Col span={8}>
              <Title
                className={titleClassStyle}
                level={5}
                style={titleItemStyle}
              >
                danh mục
              </Title>
            </Col>
          </Row>
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <img
            className="mx-auto"
            width={100}
            src={logoImg}
            alt="chovybe-logo"
          />
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <Row align={"middle"}>
            <Col span={8}>
              <Title
                className={titleClassStyle}
                level={5}
                style={titleItemStyle}
              >
                giới thiệu
              </Title>
            </Col>
            <Col span={8}>
              <Title
                className={titleClassStyle}
                level={5}
                style={titleItemStyle}
              >
                bài viết
              </Title>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <Button
                className="mr-2"
                type="default"
                size="large"
                shape="circle"
                onClick={() => navigate("/cart")}
                icon={<ShoppingCart size={17} />}
              />

              {/* Render nút user */}
              {renderUserButton()}
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default MainHeader;
