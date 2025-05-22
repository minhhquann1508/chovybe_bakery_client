import { Modal } from "antd";
import type React from "react";

const CustomModal = ({
  title,
  visible,
  setIsVisible,
  children,
}: {
  title: string;
  visible: boolean;
  setIsVisible: (value: boolean) => void;
  children: React.ReactNode;
}) => {
  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title={title}
      footer={null}
      closable={{ "aria-label": "Custom Close Button" }}
      open={visible}
      onCancel={handleCancel}
    >
      {/* Nội dung */}
      {children}
    </Modal>
  );
};

export default CustomModal;
