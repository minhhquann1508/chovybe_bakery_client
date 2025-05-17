import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import type { MenuProps } from "antd";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  Box,
  House,
  MessageSquare,
  ShoppingBag,
  Tags,
  TicketPercent,
  User,
  Image,
  SquarePen,
} from "lucide-react";
import {
  Dashboard,
  UserPage,
  Category,
  Product,
  Voucher,
  Order,
  Review,
  Banner,
  Blog,
} from "../pages/admin";
import { LOCAL_APP } from "../utils/constant";
import { logout } from "../apis/user/user";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const headerStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  borderBottom: "1px solid #ccc",
  textAlign: "right",
  padding: "0 32px",
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "12px 32px",
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  borderRight: "1px solid #ccc",
};

const layoutStyle = {
  overflow: "hidden",
  backgroundColor: "white",
  height: "100vh",
};
const AdminRouter = () => {
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <House size={15} />,
    },
    {
      key: "user-management",
      label: <Link to="/user-management">Quản lý người dùng</Link>,
      icon: <User size={15} />,
    },
    {
      key: "category-management",
      label: <Link to="/category-management">Quản lý danh mục</Link>,
      icon: <Tags size={15} />,
    },
    {
      key: "product-management",
      label: "Quản lý sản phẩm",
      icon: <Box size={15} />,
      children: [
        {
          key: "product-list",
          label: (
            <Link to="/product-management/product-list">
              Danh sách sản phẩm
            </Link>
          ),
        },
        {
          key: "inventory-management",
          label: (
            <Link to="/product-management/inventory-management">
              Quản lý số lượng tồn
            </Link>
          ),
        },
        {
          key: "best-selling",
          label: (
            <Link to="/product-management/best-selling">Sản phẩm bán chạy</Link>
          ),
        },
        {
          key: "locked-products",
          label: (
            <Link to="/product-management/locked-products">
              Sản phẩm bị khoá
            </Link>
          ),
        },
      ],
    },
    {
      key: "voucher-management",
      label: <Link to="/voucher-management">Quản lý voucher</Link>,
      icon: <TicketPercent size={15} />,
    },
    {
      key: "order-management",
      label: "Quản lý đơn hàng",
      icon: <ShoppingBag size={15} />,
      children: [
        {
          key: "order-list",
          label: (
            <Link to="/order-management/order-list">Danh sách đơn hàng</Link>
          ),
        },
        {
          key: "order-stats",
          label: (
            <Link to="/order-management/order-stats">Thống kê đơn hàng</Link>
          ),
        },
      ],
    },
    {
      key: "review-management",
      label: <Link to="/review-management">Quản lý đánh giá</Link>,
      icon: <MessageSquare size={15} />,
    },
    {
      key: "banner-management",
      label: <Link to="/banner-management">Quản lý banner</Link>,
      icon: <Image size={15} />,
    },
    {
      key: "post-management",
      label: <Link to="/post-management">Quản lý bài viết</Link>,
      icon: <SquarePen size={15} />,
    },
  ];
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [openKey, setOpenKey] = useState<string[]>([]);
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const urlKeys = pathname.split("/").filter(Boolean);
    if (urlKeys.length > 1) {
      setOpenKey([urlKeys[0]]);
      setSelectedKey([urlKeys[1]]);
    } else {
      setOpenKey([]);
      setSelectedKey([urlKeys[0]]);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      messageApi.open({
        type: "success",
        content: response.data.msg,
      });
      localStorage.removeItem(LOCAL_APP.auth);
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      messageApi.open({
        type: "error",
        content: "Đăng xuất không thành công",
      });
    }
  };

  const renderUserEmail = (): string => {
    const userData = localStorage.getItem(LOCAL_APP.auth);
    if (userData) {
      return JSON.parse(userData).email;
    } else {
      return "Xin chào";
    }
  };

  return (
    <Layout style={layoutStyle}>
      {contextHolder}
      <Sider width="250" style={siderStyle}>
        <Menu
          style={{ width: "100%" }}
          selectedKeys={selectedKey}
          openKeys={openKey}
          onOpenChange={(keys) => setOpenKey(keys)}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <span>{renderUserEmail()}</span>
          <Button type="text" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserPage />} />
            <Route path="/category-management" element={<Category />} />
            <Route
              path="/product-management/product-list"
              element={<Product />}
            />
            <Route path="/voucher-management" element={<Voucher />} />
            <Route path="/order-management/order-list" element={<Order />} />
            <Route path="/review-management" element={<Review />} />
            <Route path="/banner-management" element={<Banner />} />
            <Route path="/post-management" element={<Blog />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminRouter;
